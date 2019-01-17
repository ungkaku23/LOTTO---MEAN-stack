const mongoose = require('mongoose');

const LotterySchema = mongoose.Schema({
    draw_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    lottery_ticket: {
        type: Array
    },
    lottery_result: {
        type: Number
    }
}, {collection: 'lottery'}, { checkRuleAndUpdate: Function });

const Lottery = module.exports = mongoose.model('Lottery', LotterySchema);

function saveAll(data, callback){
    let doc = data.pop();
    let ldoc = new Lottery(doc);

    let total = data.length;

    ldoc.save(function(err, saved){
      if (err) throw err;//handle error
  
      if (total > 0) saveAll(data, callback);
      else { // all saved here
        console.log('save all done');
        callback();
      } 
    });
}

function goldRule(item, win_number) {
    for(let i = 0; i < win_number.length; i++) {
        if(item[i] != win_number[i])
            return false;
    }

    return true;
}

function silverRule(item, win_number) {
    let val = 0;
    for(let i = 0; i < item.length; i++)
    {
        for(let j = 0; j < win_number.length; j++) {
            if(item[i] == win_number[j]) {
                val += 1;
                break;
            }
        }
    }
    if(val == item.length) {
        return true;
    } else {
        return false;
    }
}

function bronzeRule(item, win_number) {
    let val = 0;
    for(let i = 0; i < item.length; i++)
    {
        for(let j = 0; j < win_number.length; j++) {
            if(item[i] == win_number[j]) {
                val += 1;
                break;
            }
        }
    }
    if(val == (item.length - 1)) {
        return true;
    } else {
        return false;
    }
}

function checkRule(item, win_number) {
    console.log(item.lottery_ticket + ' / ' + win_number);
    if(goldRule(item.lottery_ticket, win_number)) {
        return 0;
    } else {
        if(silverRule(item.lottery_ticket, win_number)) {
            return 1;
        } else {
            if(bronzeRule(item.lottery_ticket, win_number)) {
                return 2;
            }
        }
    }

    return 3; //failed
}

function saveResults(win_number, docs, callback) {
    // console.log('win number: ' + win_number);

    let ditem = docs.pop();
    let docs_total = docs.length;

    Lottery.findOneAndUpdate({_id: ditem._id}, {lottery_result: checkRule(ditem, win_number)}, function(err, saved){
        if (err) throw err;//handle error
    
        if (docs_total > 0) saveResults(win_number, docs, callback);
        else { // all saved here
          console.log('update all result');
          callback();
        } 
    });
}

function checkRuleAndUpdate(docs, callback){

    saveResults(docs[0].drawData[0].original_win_number, docs, callback);

}

module.exports.saveTickets = function(data, callback) {

    saveAll(data, callback);
}

module.exports.getTicketByParam = function(data, callback) {
    Lottery.findOne(data, callback);
}

module.exports.setLotteryResult = function(data, callback) {

    Lottery
        .aggregate([
        { $match: {lottery_result: 4,
                   draw_id: mongoose.Types.ObjectId(data.data._id)} },
        {
          $lookup:
            {
              from: "draw",
              localField: "draw_id",
              foreignField: "_id",
              as: "drawData"
            }
        },
        {
            $project: {
              "_id": 1,
              "lottery_ticket": 1,
              "drawData.type": 1,
              "drawData.original_win_number": 1
            }
        }
     ], function (err, docs) {
        if(docs.length != 0) {
            checkRuleAndUpdate(docs, callback);
        } else {
            callback();
        }
    });
}

module.exports.loadLotteryArchiveData = function(data, callback) {
    Lottery
        .aggregate([
        { $match: {user_id: mongoose.Types.ObjectId(data.id),
                   lottery_result: {'$ne': 4} }
        },
        { $group : { _id : "$draw_id", lottery_ticket_arr: { $push: "$lottery_ticket" } } },
        {
          $lookup:
            {
              from: "draw",
              localField: "_id",
              foreignField: "_id",
              as: "drawData"
            }
        },
        { 
            $match: { "drawData.type": data.params.type }
        },
        { $sort : { "drawData.no" : -1 } },
        { $skip : (data.params.pages * data.params.per_page) - data.params.per_page },
        { $limit : data.params.per_page }

     ], callback);
}

module.exports.loadLotteryArchiveDataTotalLength = function(data, callback) {
    Lottery
        .aggregate([
        { $match: {user_id: mongoose.Types.ObjectId(data.id),
                   lottery_result: {'$ne': 4} }
        },
        { $group : { _id : "$draw_id", lottery_ticket_arr: { $push: "$lottery_ticket" } } },
        {
          $lookup:
            {
              from: "draw",
              localField: "_id",
              foreignField: "_id",
              as: "drawData"
            }
        },
        { 
            $match: { "drawData.type": data.params.type }
        },
        {
            $count: "total"
        }
     ], callback);
}

module.exports.getDrawStatistics = function(data, callback) {
    Lottery
        .aggregate([
            { $match: { draw_id: mongoose.Types.ObjectId(data.draw_id),
                        lottery_result: data.rank } },
            {
                $group : { _id: "$user_id", 
                           num_of_ticket: { $sum: 1 },
                           draw_id : { $first: '$draw_id' } }
            },
            {
                $lookup: 
                    {
                        from: "draw",
                        localField: "draw_id",
                        foreignField: "_id",
                        as: "drawData"
                    }
            }
        ], callback/*, function(err, doc){

            let resData = {};
            if(doc.length != 0) {
                
                console.log('lottery docs : ' + JSON.stringify(doc));

                resData['winners'] = doc.length;
                let sum = 0;
                for(let i = 0; i < doc.length; i++) {
                    sum += doc[i].num_of_ticket;
                }
                resData['total_bet'] = sum * doc[0].drawData[0].bet_fee;
                resData['total_get_coin'] = sum * doc[0].drawData[0].jackpot.gold;

            } else {
                resData['total_bet'] = 0;
                resData['total_get_coin'] = 0;
                resData['winners'] = 0;
            }
            callback(resData);
        }*/);
}