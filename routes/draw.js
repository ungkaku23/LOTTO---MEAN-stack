const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Draw = require('../models/draw');
const DrawProvider = require('../providers/draw_provider');

router.get('/last_draw_data', (req, res, next) => {
    let lastDrawData = [];

    DrawProvider.loadLastDrawData_Servicer(0).then((dld_data) => {  
        lastDrawData.push(dld_data);

        DrawProvider.loadLastDrawData_Servicer(1).then((dld_data1) => {  
            lastDrawData.push(dld_data1);
            res.json({last_draw_data: lastDrawData});
        })
        .catch((err1) => {
            console.log(err1);
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get('/draw_configs', (req, res, next) => {
    DrawProvider.loadDrawConfigs_Servicer().then((data) => {
        res.json({draw_config: data});
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/load_draw_history', (req, res, next) => {
    // console.log('draw data---');

    Draw.loadDrawHistory(req.body, (err, data) => {
        let resData = {};
        resData['data'] = data;
        
        Draw.loadDrawHistoryTotal(req.body, (err, total) => {
            resData['total'] = total;
            res.json(resData);
        });
    });
});

router.post('/load_draw_detail', (req, res, next) => {
    // console.log('draw detail');

    Draw.loadDrawDetail(req.body, (err, data) => {
        res.json(data);
    });
});

router.post('/tester', (req, res, next) => {
    res.json({wow: 'ww'});
});

module.exports = router;