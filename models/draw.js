const mongoose = require('mongoose');
// Draw Schema
const DrawSchema = mongoose.Schema({
    no: {
        type: Number
    },
    type: {
        type: Number
    },
    date: {
        type: Number
    },
    win_number: {
        type: Array
    },
    original_win_number: {
        type: Array
    },
    jackpot: {
        type: Object
    },
    draw_results: {
        type: Array
    },
    status: {
        type: Number // 0: processing, 1: processed
    },
    bet_fee: {
        type: Number
    }
}, {collection: 'draw'});

const Draw = module.exports = mongoose.model('Draw', DrawSchema);


module.exports.getLastDrawData = function(param, callback) {

    Draw.findOne({type: param}, {}, { sort: { 'no' : -1 } }, callback);
}

module.exports.getLastDrawDataWithParams = function(param, callback) {
    Draw.findOne(param, {}, { sort: {'no' : -1} }, callback);
}

module.exports.addNewDrawData = function(ddata, callback) {
    const newDrawData = new Draw(ddata);
    newDrawData.save(callback);
}

module.exports.updateDrawDataById = function(ddata, callback) {

    Draw.findOneAndUpdate({_id: ddata.id}, ddata, callback);
}

module.exports.loadDrawHistory = function(ddata, callback) {

    const type = parseInt(ddata.type);
    const status = parseInt(ddata.status);
    const page = parseInt(ddata.pgData.pages);
    const limit = parseInt(ddata.pgData.per_page);

    Draw.find({type: type, status: status}, callback)
        .skip((limit * page) - limit)
        .limit(limit);

}

module.exports.loadDrawHistoryTotal = function(ddata, callback) {

    const type = parseInt(ddata.type);
    const page = parseInt(ddata.pgData.pages);
    const limit = parseInt(ddata.pgData.per_page);
    const status = parseInt(ddata.status);

    Draw.find({type: type, status: status})
        .countDocuments(callback);

}

module.exports.loadDrawDetail = function(ddata, callback) {
    Draw.find({_id: ddata.id}, callback);
}