const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const fs = require("fs");

const globalConfig = require('../config/global');

const notificationsHandler = require('../providers/send_notifications');
const sms_processor = require('../providers/sms_processor');
const email_sender = require('../providers/email_sender');
const bitcoin_provider = require('../providers/bitcoin_provider');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // console.log('uuu : ' + req.body.username);
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        const datetimestamp = Date.now();
        if(file.originalname == 'blob') {
            callback(null, 'user' + '-' + datetimestamp + '.' + file.mimetype.split('/')[1]);
        } else {
            callback(null, 'user' + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        }
        
    }
});
const upload = multer({ storage: storage })


function AddUserAndSendMail(req, res, newUser, redirectPath) {
    User.addUser(newUser, (err, user) => {
        if(err) {
            console.log('err : ' + err);
            res.json({success: false, msg: 'Failed to register, Please try again.'});
        } else {
            
            let emailContext= [{
                nickname: req.body.nickname,
                redirectUrl: redirectPath + user._id,
                toEmail: req.body.email
            }];
            email_sender.sendEmail('verification_email', emailContext);
            
            res.json({success: true, msg: 'Success to register, Please check your email inbox and verfiy your account.'});
        }
    });
}


// Register
router.post('/register', (req, res, next) => {
    console.log('pwer_email : ' + req.body.email);

    let bwa = bitcoin_provider.generateBitcoinWalletAddress();

    let newUser = new User({
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        origin_password: req.body.password,
        notifications: {login_notification: false, operation_notice: false, lottery_results: false},
        verified: 0, // unverified,
        phonenumber: '',
        phonenumber_verified: false,
        two_step_verification: false,
        ts_code: '',
        w_address: bwa.address,
        w_private_key: bwa.privateKey 
    });
    /*User.checkExistNickname(req.body.nickname, (err, cnt) => {
        if(cnt > 0)
        {
            res.json({success: false, msg: 'this nickname already exist, please choose another one.'});
        } else { */
            User.checkExistEmail(req.body.email, (err, ecnt) => {
                if(ecnt > 0)
                {
                    res.json({success: false, msg: 'this email already exist, please choose another one.'});
                } else {
                    AddUserAndSendMail(req, res, newUser , globalConfig.frontend_baseurl + '/loto/verification/');
                }
            });
        /* }
    }); */
    
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('emailer : ' + email);
    
    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, sflag: 0, msg: 'User not found'});
        }

        if(user.verified == 0) {
            res.json({success: false, sflag: 2, msg: 'Your account still not verified, please verify account first.'});
        }
        if(user.verified != 0) {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 86400 // 1hour
                    });

                    if(user.notifications.login_notification) {
                        notificationsHandler.sendLoginNotification(user);
                    }

                    if(user.phonenumber_verified) {
                        sms_processor.sendSMSWithGenerateCodeAtLogin(user);
                    }
                    
                    res.json({
                        success: true,
                        msg: 'Logined successfully',
                        token: 'JWT '+token,
                        user: user
                    });
                } else {
                    res.json({ success: false, sflag: 1, msg: 'Wrong Password' });
                }
            });
        }
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// Verification
router.post('/verification', (req, res, next) => {
    User.getUserById(req.body.code, (err, user) => {
        if(user != undefined) {
            User.updateVerifiedById(user._id, (err, data) => {
                console.log('verified callback : ' + JSON.stringify(data));
                user.verified = 1;
                
                if(req.body.type == 1) { // from social account
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 86400 // 1hour
                    });
                    
                    if(user.notifications.login_notification) {
                        notificationsHandler.sendLoginNotification(user);
                    }

                    if(user.phonenumber_verified) {
                        sms_processor.sendSMSWithGenerateCodeAtLogin(user);
                    }

                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: user,
                        msg: 'Verified successfully'
                    });
                } else {  // from manual account
                    res.json({
                        success: true,
                        user: user,
                        msg: 'Verified successfully'
                    });
                }
                
            });
        } else {
            res.json({
                success: false,
                msg: 'Invalid code'
            });
        }
    });
});

// Resend email
router.post('/resend-email', (req, res, next) => {
    User.getUserByEmail(req.body.email, (err, user) => {
        if(user != undefined) {

            let emailContext = [{
                nickname: user.nickname,
                redirectUrl: globalConfig.frontend_baseurl + '/loto/verification/' + user._id,
                toEmail: user.email
            }];
            email_sender.sendEmail('resend_verification_email', emailContext);

            res.json({
                success: true,
                user: user
            });
        } else {
            res.json({
                success: false,
                msg: 'Not found user'
            });
        }
    });
});

// Forgot Password
router.post('/forgot-password', (req, res, next) => {
    User.getUserByEmail(req.body.email, (err, user) => {
        if(user != undefined) {

            let emailContext = [{
                nickname: user.nickname,
                redirectUrl: globalConfig.frontend_baseurl + '/loto/reset-password/' + user._id,
                toEmail: user.email
            }];
            email_sender.sendEmail('forgot_password_email', emailContext);

            res.json({
                success: true,
                user: user
            });
        } else {
            res.json({
                success: false,
                msg: 'Not found user'
            });
        }
    });
});

// Reset Password
router.post('/reset-password', (req, res, next) => {
    User.getUserById(req.body.code, (err, user) => {
        if(user != undefined) {
            let mypwdata = {id: user._id, password: req.body.password};
            User.updatePasswordById(mypwdata, (err, data) => {
                res.json({
                    success: true,
                    msg: 'Update password successfully'
                });
            });
        } else {
            res.json({
                success: false,
                msg: 'Invalid code'
            });
        }
    });
});

// Profile
router.post('/profile-update', passport.authenticate('jwt', {session: false}), upload.single('avatar'), (req, res, next) => {
    
    let updateData = req.body;

    if(req.file != undefined) {
        updateData.avatar = req.file.destination + req.file.filename;
    }
    updateData.id = req.user._id;

    console.log('filedata : ' + JSON.stringify(req.file));
    console.log('update data : ' + JSON.stringify(updateData));


    /*User.getUserByNickname(updateData.nickname, (err, user) => {
        if(user) {
            console.log('found avatar : ' + user.avatar);
            console.log('my id : ' + updateData.id);

            if(user._id.toString() != updateData.id.toString()) {
                return res.json({success: false, msg: 'this nickname already used by other user, please choose another one again.'});
            }
        }*/

        User.updateProfile(updateData, (err, user1) => {
            console.log('up calledback : ' + JSON.stringify(user1));
            res.json({
                success: true,
                msg: 'Update profile successfully',
                user: user1});
        });
    // });
    
    

});

// email update
router.post('/email-update', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    User.comparePassword(req.body.password, req.user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
            let updateData = {id: req.user._id, email: req.body.email};
            User.updateProfile(updateData, (err, data) => {
                res.json({
                    success: true,
                    msg: 'Update email successfully'
                });
            });
        } else {
            res.json({ success: false, sflag: 1, msg: 'Wrong Password' });
        }
    });

});

// password update
router.post('/password-update', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    User.comparePassword(req.body.old_password, req.user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
            let updateData = {id: req.user._id, password: req.body.password};
            User.updatePasswordById(updateData, (err, data) => {
                res.json({
                    success: true,
                    msg: 'Update password successfully'
                });
            });
        } else {
            res.json({ success: false, sflag: 1, msg: 'Wrong Password' });
        }
    });

});

// notifications update
router.post('/notifications-update', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    console.log('notifications : ' + req.body.notifications);
    let updateData = {id: req.user._id, notifications: req.body.notifications};
    User.updateProfile(updateData, (err, data) => {
        res.json({
            success: true,
            msg: 'Update notifications successfully'
        });
    });
});

// sms 2stepverification update
router.post('/sms-2stepverification-update', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    let updateData = req.body;
    updateData['id'] = req.user._id;

    User.updateProfile(updateData, (err, data) => {
        res.json({
            success: true
        });
    });
});

// send sms and generate code
router.post('/sms-send-and-generatecode', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    sms_processor.sendSMSWithGenerateCode(req, res);
});

// check sms code
router.post('/sms-check-code', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    sms_processor.sendSMSCheckCode(req, res);
});

// doWithSocialAccData

router.post('/access-with-socialaccount', (req, res, next) => {
    
    User.checkExistEmail(req.body.email, (err, ecnt) => {
        if(ecnt > 0)
        {
            // email exist
            User.getUserByEmail(req.body.email, (err, userData) => {
                if(userData != undefined) {
                    if(userData.verified == 1) { // verfiied
                        res.json({
                            success: true,
                            msg: '',
                            user: userData,
                            directFlag: 1 // direct login without register
                        });
                    } else { // not verified
                        let emailContext = [{
                            nickname: userData.nickname,
                            redirectUrl: globalConfig.frontend_baseurl + '/loto/social-login/' + userData._id,
                            toEmail: userData.email
                        }];
                        email_sender.sendEmail('verification_email', emailContext);
                        res.json({
                            success: true,
                            msg: 'Your account already exist but not verified, Please check your email inbox and verfiy your account.',
                            user: userData,
                        });
                    } 
                }
            });
        } else { 
            let bwa = bitcoin_provider.generateBitcoinWalletAddress();

            let newUser = new User({
                nickname: req.body.nickname,
                email: req.body.email,
                password: '',
                origin_password: '',
                notifications: {login_notification: false, operation_notice: false, lottery_results: false},
                verified: 0, // unverified,
                phonenumber: '',
                phonenumber_verified: false,
                two_step_verification: false,
                ts_code: '',
                w_address: bwa.address,
                w_private_key: bwa.privateKey 
            });
            AddUserAndSendMail(req, res, newUser , globalConfig.frontend_baseurl + '/loto/social-login/');
        }
    });
});

// send contact us email
router.post('/send-contact-email', (req, res, next) => {
    let sc_email_data = req.body;
    sc_email_data['toEmail'] = 'jhmun216@gmail.com';
    if(req.body.ctype == 1) {
        sc_email_data['subject'] = 'LOTO - Support Request';
    } else {
        sc_email_data['subject'] = 'LOTO - Affiliate Inquires';
    }

    let scdata = [];
    scdata.push(sc_email_data);

    email_sender.sendEmail('contactus_email', scdata);

    res.json({ success: true });
    
});

module.exports = router;