const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Lottery = require('../models/lottery');
const Draw = require('../models/draw');

router.post('/save_tickets', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    Lottery.saveTickets(req.body, (err, data) => {
        res.json({
            success: true,
            msg: 'Tickets are all saved successfully'
        });
    });
});

router.post('/check_ticket_exist', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Lottery.getTicketByParam(req.body, (err, data) => {
        console.log('cdata : ' + JSON.stringify(data));
        
        if(data != null) {
            res.json({
                success: false,
                msg: 'This number already sold out'
            });
        } else {
            res.json({
                success: true,
                msg: 'ok'
            });
        }
    });
});

router.post('/load_archive_data', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let arc_param = {id: req.user._id , params: req.body};
    Lottery.loadLotteryArchiveDataTotalLength(arc_param, (err, tdata) => {
        console.log('total archived data: ' + JSON.stringify(tdata));
        if(tdata.length != 0) {
            let resObj = { total: tdata[0].total };

            Lottery.loadLotteryArchiveData(arc_param, (err, rdata) => {
                // console.log('archived data : ' + JSON.stringify(rdata));
                resObj['data'] = rdata;
                
                res.json(resObj);
            });
        } else {
            res.json({
                total: 0,
                data: []
            });
        }
    });
    
});

function doDrawStatistics(result_param, result_data, res) {
    // console.log('rank : ' + result_data.length);
    result_param['rank'] = result_data.length;

        Lottery.getDrawStatistics(result_param, (err, lds_data) => {
            if(err) reject(err);

            let resData = {};
            if(lds_data.length != 0) {

                resData['winners'] = lds_data.length;
                let sum = 0;
                for(let i = 0; i < lds_data.length; i++) {
                    sum += lds_data[i].num_of_ticket;
                }
                resData['total_bet'] = sum * lds_data[0].drawData[0].bet_fee;
                if(result_data.length == 0) {
                    resData['total_get_coin'] = sum * lds_data[0].drawData[0].jackpot.gold;
                } else if(result_data.length == 1) {
                    resData['total_get_coin'] = sum * lds_data[0].drawData[0].jackpot.silver;
                } else if(result_data.length == 2) {
                    resData['total_get_coin'] = sum * lds_data[0].drawData[0].jackpot.bronze;
                }

            } else {
                resData['total_bet'] = 0;
                resData['total_get_coin'] = 0;
                resData['winners'] = 0;
            }

            result_data.push(resData);
            if(result_data.length < 3) {
                doDrawStatistics(result_param, result_data, res);
            }
            if(result_data.length == 3) {
                res.json(result_data);
            }
        });
    
}

router.post('/load_lottery_results', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let result_param = {user_id: req.user._id, type: req.body.type};
    Draw.getLastDrawDataWithParams({type: req.body.type, status: 1}, (err, lddp_data) => {
        
        console.log('lastdrawparam : ' + lddp_data);
        if(lddp_data != null) {
            result_param['draw_id'] = lddp_data._id;
            let result_data = [];

            doDrawStatistics(result_param, result_data, res);
        } else {
            res.json({});
        }
        
    });
});

router.post('/load_lottery_top_results', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Draw.getLastDrawDataWithParams({type: req.body.type, status: 1}, (err, lddp_data) => {
        if(lddp_data != null) {
            res.json({
                success: true,
                data: {
                    winning_numbers: lddp_data.original_win_number
                }
            });
        } else {
            res.json({});
        }
    });
});

module.exports = router;