const Lottery = require('../models/lottery');
const SiteConfig = require('../models/site_config');
const cron = require("node-cron");
const globalConfig = require('../config/global');

const express = require('express');
const app = express();
const server = app.listen(globalConfig.lottery_result_socket_server);
const io = require('socket.io').listen(server); 

allClients = [];

function checkSocket(obj) {
    for(let i = 0; i < allClients.length; i++)
    {
        if(allClients[i].obj == obj) {
            return allClients[i].no;
        }
    }
}
function removeSocket(no) {
    console.log('w : ' + no);
    for(let i = 0; i < allClients.length; i++)
    {
        if(allClients[i].no == no) {
            allClients.splice(i, 1);
            break;
        }
    }
}
function getMaxSocket(data, socket) {
    let temp = {obj: socket, str: data , no: 0};
    for(let i = 0; i < allClients.length; i++) {
        if(temp.str == allClients[i].str) {
            if(temp.no < allClients[i].no) {
                temp.no = allClients[i].no;
            }
        }
    }

    return temp;
}
function getAvailableClients() {
    let temp = [];
    if(allClients.length != 0) {
        temp.push(allClients[0]);
        for(let i = 0; i < allClients.length; i++) {
            // console.log('first : ' + temp[temp.length - 1].str);
            // console.log('each : ' + allClients[i].str);
            if(temp[temp.length - 1].str != allClients[i].str) {
                temp.push(allClients[i]);
            }
        }
    }
    
    return temp;
}

io.sockets.on('connection', function(socket) {
    console.log('connected : ');
    
    socket.on('register', function (data) {
        // console.log('reg data : ' + data);
        let new_socket = getMaxSocket(data, socket);
        new_socket.no += 1;
        allClients.push(new_socket);
    });
    socket.on('disconnect', function() {
       
       for(let j = 0; j < allClients.length; j++) {
           // console.log('b no : ' + allClients[j].str + allClients[j].no);
       }
       console.log('Got disconnect! : ' + checkSocket(socket));
 
       removeSocket(checkSocket(socket));

       for(let j = 0; j < allClients.length; j++) {
            // console.log('a no : ' + allClients[j].str + allClients[j].no);
        }
    });
 });


module.exports.setLotteryResults = function(lastDrawDatas, drawType) {
    console.log('set lottery results : ');
    if(lastDrawDatas.flag != 0) {
        Lottery.setLotteryResult(lastDrawDatas, (err, data) => {
            console.log('really updated restuls ***');

            // io.emit('update_lottery_result', drawType);

            let availableClients = [];
            availableClients = getAvailableClients();

            for(let j = 0; j < availableClients.length; j++) {
                console.log('t no : ' + availableClients[j].str + availableClients[j].no);
                availableClients[j].obj.emit('update_lottery_result', drawType);
            }
           
        });
    }
}

module.exports.tester = function(data) {
    /*
    let availableClients = [];
            availableClients = getAvailableClients();

            for(let j = 0; j < availableClients.length; j++) {
                console.log('t no : ' + availableClients[j].str + availableClients[j].no);
                availableClients[j].obj.emit('update_lottery_result', drawType);
            }*/
    // io.emit('update_lottery_result', 1);
}