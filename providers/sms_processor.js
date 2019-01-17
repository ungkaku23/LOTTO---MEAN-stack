const global_config = require('../config/global');
const User = require('../models/user');

const accountSid = global_config.twillo_sms_asid;
const authToken = global_config.twillo_sms_token;
const clientTwillo = require('twilio')(accountSid, authToken);

module.exports.sendSMSWithGenerateCode = function(req, res) {
    let verify_code = Math.floor(Math.random()*900000) + 100000;
    console.log('6 digits code : '+ verify_code );

    clientTwillo.messages
        .create({
            body: 'LOTO 2 step verification code - ' + verify_code,
            from: global_config.twillo_sender_number,
            to: req.body.smscountry + req.body.number
        })
        .then(message => {
            console.log('SMS : ' + message.sid);
            
            let updateData = {id: req.user._id, phonenumber: req.body.smscountry + req.body.number, ts_code: verify_code};
            User.updateProfile(updateData, (err, data) => {
                res.json({
                    success: true,
                    phonenumber: req.body.smscountry + req.body.number,
                    ts_code: verify_code,
                    msg: 'SMS verification code sent to your phone, please check it.'
                });
            });
            
        }, err => {
            console.log('err : ' + err);
            res.json({
                success: false,
                msg: 'Invalid Phone number, please try again.'
            });
        })
        .done();
}

module.exports.sendSMSWithGenerateCodeAtLogin = function(auser) {
    let verify_code = Math.floor(Math.random()*900000) + 100000;
    console.log('6 digits code : '+ verify_code );

    clientTwillo.messages
        .create({
            body: 'LOTO 2 step verification code - ' + verify_code,
            from: global_config.twillo_sender_number,
            to: auser.phonenumber
        })
        .then(message => {
            console.log('SMS : ' + message.sid);

            let updateData = {id: auser._id, ts_code: verify_code};
            User.updateProfile(updateData, (err, data) => {
                
            });

        }, err => {
            console.log('err : ' + err);
        })
        .done();
}

module.exports.sendSMSCheckCode = function(req, res) {

    if(req.user.ts_code == req.body.smscode) {
        let updateData = {id: req.user._id, phonenumber_verified: true};
        User.updateProfile(updateData, (err, data) => {
            res.json({
                success: true,
                phonenumber_verified: true,
                msg: 'SMS code is verified successfully'
            });
        });
    } else {
        res.json({
            success: false,
            msg: 'SMS code is invalid'
        });
    }

}