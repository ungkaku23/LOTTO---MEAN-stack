const Draw = require('../models/draw');
const SiteConfig = require('../models/site_config');
const cron = require("node-cron");
const globalConfig = require('../config/global');

const request = require('request');
const Socket = require('blockchain.info/Socket');
const W3CWebSocket = require('websocket').w3cwebsocket;

const express = require('express');
const app = express();
const server = app.listen(globalConfig.timeleft_socket_server);
const io = require('socket.io').listen(server);

const md5 = require('md5');
const crc32 = require('js-crc').crc32;

const LotteryProvider = require('../providers/lottery_provider');

let drawConfigs = {};
let last_drawDataWithStatus = [{data: {original_win_number: []}}, {data: {original_win_number: []}}]; // [0] : bit3, [1] : bit4

function loadDrawConfigs() {
    return new Promise(function(resolve, reject) {
        SiteConfig.getSiteConfigs('', (err, site_configs) => {
            if(err) reject(err);
    
            let draw_start_time = [];
            let draw_period;

            // console.log('site_configs : ' + JSON.stringify(site_configs));
    
            if(site_configs.length != 0) {
                if((site_configs[0].bit3_draw_start_time != undefined) && (site_configs[0].bit4_draw_start_time != undefined)) {
                    draw_start_time.push(site_configs.bit3_draw_start_time);
                    draw_start_time.push(site_configs.bit4_draw_start_time);
                    draw_period = site_configs.draw_period;
                    
                } else {
                    draw_start_time = globalConfig.default_draw_start_time;
                    draw_period = globalConfig.default_draw_period;
                }
            } else {
                draw_start_time = globalConfig.default_draw_start_time;
                draw_period = globalConfig.default_draw_period;
            }


            drawConfigs = {draw_start_time: draw_start_time,  
                           draw_period: draw_period}; //load draw config
            
            resolve(drawConfigs);
       });
    });
}

function loadLastDrawData(type) { // type  0: bit3, 1: bit4
    return new Promise(function(resolve, reject) {
        Draw.getLastDrawData(type, (err, dld_data) => {
            if(err) reject(err);
    
            let flag; // empty draw data or not
            let data = {};
            let results = {};

            // console.log('dld_datarr : ' + JSON.stringify(dld_data));
    
            if(dld_data != null) {
                results['data'] = dld_data;
                results['flag'] = 1; // found one;
            } else {
                results['flag'] = 0; // empty; will start draw
            }

            last_drawDataWithStatus[type] = results; // update the latest draw data
            
            resolve(results);
       });
    });
}

function checkExistHeight(height, type) {
    for(let i = 0; i < last_drawDataWithStatus[type].data['win_number'].length; i++)
    {
        if(parseInt(last_drawDataWithStatus[type].data['win_number'][i].block_height) == parseInt(height)) {
            return false;
        }
    }

    return true; // there is no same height, can add now.
}

function getOriginalWinNumber(data, type) {
    if(type == 0) { // bit 3
        let total = md5(data.prev_block_hash) + 
                    md5(data.block_height) + 
                    md5(data.block_hash);
        let sub_total = md5(total);
        let crctotal = parseInt(crc32(sub_total), 16).toString(10);

        return ( parseInt(crctotal) % 9 ) + 1;
    }
    if(type == 1) { // bit 4
        let total = md5(data.prev_block_hash) + 
                    md5(data.block_height) + 
                    md5(data.block_hash);
        let sub_total = md5(total);
        let crctotal = parseInt(crc32(sub_total), 16).toString(10);

        return ( parseInt(crctotal) % 9 ) + 1;
    }
}

function checkExistNumber(number, type) {

    console.log('original_win_number: ' + last_drawDataWithStatus[type].data['original_win_number']);

    for(let i = 0; i < last_drawDataWithStatus[type].data['original_win_number'].length; i++) {
        if(number == last_drawDataWithStatus[type].data['original_win_number'][i])
            return false;
    }
    return true;
}

function generateWinNumber(type) {

    const wclient = new W3CWebSocket('wss://ws.blockchain.info/inv');

    wclient.onopen = function() {
        console.log('WebSocket Client Connected - type - ' + type);
        wclient.send('{"op":"blocks_sub"}');
    };

    last_drawDataWithStatus[type].tempArr = [];

    wclient.onmessage = function(e) {
        let newBlockHint = JSON.parse(e.data); 
        console.log('xx block height - type - '+ type +' : ' + newBlockHint.x.height);

        let blockDate = new Date(newBlockHint.x.time*1000);

        last_drawDataWithStatus[type].tempArr.push({
            height: newBlockHint.x.height,
            hash: newBlockHint.x.hash,
            date: blockDate
        });

        if( (last_drawDataWithStatus[type].data['win_number'].length < (type + 3)) && 
            (parseInt(newBlockHint.x.time) > parseInt(last_drawDataWithStatus[type].data.date)) &&  // only get the block over the draw started time
            checkExistHeight(newBlockHint.x.height, type) && // check same value in array
            (parseInt(newBlockHint.x.height) % 2 == 1)) // only add odd height
            {
                if(last_drawDataWithStatus[type].tempArr.length > 1) {
                    let tempJ = {
                        block_hash: newBlockHint.x.hash,
                        block_height: newBlockHint.x.height,
                        prev_block_hash: last_drawDataWithStatus[type].tempArr[last_drawDataWithStatus[type].tempArr.length - 2].hash,
                        block_date: blockDate
                    };
                    console.log('orig num : ' + getOriginalWinNumber(tempJ, type));
                    console.log('exist or not: ' + checkExistNumber(getOriginalWinNumber(tempJ, type), type));

                    if(checkExistNumber(getOriginalWinNumber(tempJ, type), type)) {
                        last_drawDataWithStatus[type].data['win_number'].push(tempJ);

                        last_drawDataWithStatus[type].data['original_win_number'].push(getOriginalWinNumber(tempJ, type));
                    }
                                       
                }
            }

        console.log('block arr length - type - ' + type + ' : ' + last_drawDataWithStatus[type].data['win_number'].length);

        if(last_drawDataWithStatus[type].data['win_number'].length == (type + 3)) {
            console.log('done - type - ' + type + ' : ' + JSON.stringify(last_drawDataWithStatus[type].data['win_number']));

            Draw.updateDrawDataById({ id: last_drawDataWithStatus[type].data._id, 
                win_number: last_drawDataWithStatus[type].data.win_number,
                original_win_number: last_drawDataWithStatus[type].data.original_win_number}, (err, udd_data) => {
                console.log('updated win number - type - ' + type);
                wclient.close();

                });
        }

    };

}

function generateDraw(type) {
   console.log('--generateDraw--');
   
   let now = new Date();
   // console.log('will new start date : ' + now.toUTCString());

   let newDrawData = {
        date: parseInt(now.getTime() / 1000), // timestamp in seconds, when try to convert for date, need to *1000 and do something.
        status: 0 ,
        type: type
   };

   if(type == 0) {
       newDrawData['bet_fee'] = 0.00005;
       newDrawData['jackpot'] = {
            gold: 0.005,
            silver: 0.0001,
            bronze: 0.00005
       };
   } else {
       newDrawData['bet_fee'] = 0.0001;
       newDrawData['jackpot'] = {
                gold: 0.008,
                silver: 0.0005,
                bronze: 0.0001
       };
   }

   if(last_drawDataWithStatus[type].flag == 0) {
       newDrawData['no'] = 1;
   } else {
       newDrawData['no'] = last_drawDataWithStatus[type].data.no + 1;
   }

   Draw.addNewDrawData(newDrawData, (err, results) => {
        console.log('added');

        // generate Win number

        // now let's start new draw
        loadLastDrawData(type).then((ldata) => {    // update the global last_drawDataWithStatus value
            console.log('last_drawDataWithStatus-type-' + type + ': ' + JSON.stringify(last_drawDataWithStatus[type]));
            generateWinNumber(type);

            io.emit('added_newdraw', 'aa');
        })
        .catch((lerr) => {
            console.log(lerr);
        });
   });
   
}

function checkHitDeadtime(ttime, type) {

    if(last_drawDataWithStatus[type].flag == 0) { // no last data
        let now = new Date();
        let nowtime = now.getUTCHours() + '.' + now.getUTCMinutes() + '.' + now.getUTCSeconds();

        if(ttime == nowtime) {
            console.log('empty - ' + ttime + ' / ' + nowtime);
            return true; 
        }
    } else {
        let now = new Date();
        let period = parseInt(now.getTime() / 1000) - last_drawDataWithStatus[type].data.date;
        
        if(period == parseInt((drawConfigs.draw_period * 3600000) / 1000)) {
            console.log('exist - ' + parseInt((drawConfigs.draw_period * 3600000) / 1000) + ' / ' + period);
            return true;
        }
    }

    return false;
}

function updateAndGenerateDraw(type) {
    if(last_drawDataWithStatus[type].flag != 0) { // last data exist
        Draw.updateDrawDataById({
            id: last_drawDataWithStatus[type].data._id,
            status: 1
        }, (err, data) => {
            generateDraw(type);
        });
    } else {
        generateDraw(type);
    }
}

function mainBody() {
    if(checkHitDeadtime(drawConfigs.draw_start_time[0], 0)) { // hit the deadtime of the draw for bit 3
        LotteryProvider.setLotteryResults(last_drawDataWithStatus[0], 0);
        updateAndGenerateDraw(0);
    }
    if(checkHitDeadtime(drawConfigs.draw_start_time[1], 1)) { // hit the deadtime of the draw for bit 4
        LotteryProvider.setLotteryResults(last_drawDataWithStatus[1], 1);
        updateAndGenerateDraw(1);
    }
}

module.exports.startAction = function() {

     loadDrawConfigs().then((dc_data) => {
        console.log('draw config : ' + JSON.stringify(drawConfigs));
        
        loadLastDrawData(0).then((dld3_data) => {  // bit 3 load

            loadLastDrawData(1).then((dld4_data) => {  // bit 4 load
                console.log('last draw datas : ' + JSON.stringify(last_drawDataWithStatus));

                // schedule tasks to be run on the server   
                cron.schedule('*/1 * * * * *', function() {
                    mainBody();
                });
            }).catch((err3) => {
                console.log(err3);
            });
        }).catch((err2) => {
            console.log(err2);
        });
     }).catch((err) => {
         console.log(err);
     });
}

module.exports.loadLastDrawData_Servicer = function(type) { // type  0: bit3, 1: bit4
    return new Promise(function(resolve, reject) {
        Draw.getLastDrawData(type, (err, dld_data) => {
            if(err) reject(err);
    
            let flag; // empty draw data or not
            let data = {};
            let results = {};

            // console.log('dld_datarr : ' + JSON.stringify(dld_data));
    
            if(dld_data != null) {
                results['data'] = dld_data;
                results['flag'] = 1; // found one;
            } else {
                results['flag'] = 0; // empty; will start draw
            }
            
            resolve(results);
       });
    });
}
module.exports.loadDrawConfigs_Servicer = function() {
    return new Promise(function(resolve, reject) {
        SiteConfig.getSiteConfigs('', (err, site_configs) => {
            if(err) reject(err);
    
            let draw_start_time = [];
            let draw_period;

            // console.log('site_configs : ' + JSON.stringify(site_configs));
    
            if(site_configs.length != 0) {
                if((site_configs[0].bit3_draw_start_time != undefined) && (site_configs[0].bit4_draw_start_time != undefined)) {
                    draw_start_time.push(site_configs.bit3_draw_start_time);
                    draw_start_time.push(site_configs.bit4_draw_start_time);
                    draw_period = site_configs.draw_period;
                    
                } else {
                    draw_start_time = globalConfig.default_draw_start_time;
                    draw_period = globalConfig.default_draw_period;
                }
            } else {
                draw_start_time = globalConfig.default_draw_start_time;
                draw_period = globalConfig.default_draw_period;
            }
            
            resolve({draw_start_time: draw_start_time,  
                draw_period: draw_period});
       });
    });
}

