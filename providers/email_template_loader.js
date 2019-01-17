const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');
const fs = require('fs');

module.exports.loadTemplate = function(templateName, contexts) {

    let template = new EmailTemplate(path.join(__dirname, '../email_templates', templateName));
    return Promise.all(contexts.map((context => {
        return new Promise((resolve, reject) => {
            template.render(context, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    })));
}

module.exports.base64_encode = function(filename) {
    // read binary data
    const bitmap = fs.readFileSync(path.join(__dirname, '../uploads/assets/imgs/', filename));
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}