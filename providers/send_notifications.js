const sgMail = require('@sendgrid/mail');
const global_config = require('../config/global');
sgMail.setApiKey(global_config.sendgrid_api);
const eTemplateHandler = require('./email_template_loader');

module.exports.sendLoginNotification = function(user) {
    console.log('current User : ' + JSON.stringify(user));
    const now = new Date();
    const utc_timestamp = new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
    
    console.log('UTC: ' + utc_timestamp.toUTCString());
    
    let emailContext = [{
        nickname: user.nickname,
        logined_time: utc_timestamp.toUTCString()
    }];
    eTemplateHandler.loadTemplate('login_notification', emailContext).then((results) => {
        const msg = {
            to: user.email,
            from: 'coalabear1010@gmail.com',
            subject: results[0].subject,
            text: results[0].text,
            html: results[0].html
        };
        sgMail.send(msg);
    });
}

module.exports.sendOperationNotification = function(user) {

}

module.exports.sendLotteryResultsNotification = function(user) {

}