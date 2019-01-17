const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const WithdrawWallets = require('../models/withdraw_wallets');

router.post('/save_address', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    let data = req.body;
    data['user_id'] = req.user._id;

    WithdrawWallets.saveAddress(data, (err, result) => {
        if(err) throw err;

        res.json({
            success: true,
            msg: 'Withdraw wallet address saved successfully'
        });
    });
});

router.get('/load_address', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    let data = {};
    data['user_id'] = req.user._id;

    WithdrawWallets.loadAddressByParam(data, (err, result) => {
        if(err) throw err;

        res.json({
            success: true,
            data: result,
            msg: 'Load the withdraw addresses successfully'
        });
    });
});

router.post('/update_address', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    WithdrawWallets.updateAddressByParam(req.body, (err, result) => {
        if(err) throw err;

        res.json({
            success: true,
            msg: 'Updated the withdraw addresses successfully'
        });
    });
});

router.post('/remove_address', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    WithdrawWallets.removeAddressById(req.body, (err, result) => {
        if(err) throw err;

        res.json({
            success: true,
            msg: 'Removed the withdraw addresses successfully'
        });
    });
});

router.post('/update_usage', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    WithdrawWallets.updateUsage(req.body, (err, result) => {
        if(err) throw err;

        res.json({
            success: true,
            msg: 'Updated the withdraw addresses usage successfully'
        });
    });
});

module.exports = router;