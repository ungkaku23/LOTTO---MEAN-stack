const global_config = require('../config/global');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(global_config.sendgrid_api);

const eTemplateHandler = require('../providers/email_template_loader');

module.exports.sendEmail = function(templateName, contexts) {

    console.log('se-tn : ' + templateName);
    console.log('se-ct : ' + JSON.stringify(contexts));
    
    eTemplateHandler.loadTemplate(templateName, contexts).then((results) => {
        console.log('emaildata : ' + JSON.stringify(results));
        console.log('toEmail : ' + contexts[0].toEmail);
        const msg = {
            to: contexts[0].toEmail,
            from: 'coalabear1010@gmail.com',
            subject: results[0].subject,
            text: results[0].text,
            html: results[0].html
        };
        sgMail.send(msg);
    }).catch((error) => {
        console.log('error', error);
    });

}
