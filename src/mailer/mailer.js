const config = require('../app.config');
const mailer = require('nodemailer');
const templates = require('./mail-templates');

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailerEmail,
      pass: config.mailerPassword
    }
});

function sendUserRegistered(userEmail) {
    sendMail(userEmail, templates.userRegistered);
}

function sendProductCreated(userEmail) {
    sendMail(userEmail, templates.productCreated);
}

function sendProductRejected(userEmail) {
    sendMail(userEmail, templates.productRejected);
}

function sendProductReviewed(userEmail) {
    sendMail(userEmail, templates.productReviewed);
}

function sendProductPayed(userEmail) {
    sendMail(userEmail, templates.productPayed);
}

function sendMail(userEmail, template) {
    const options = {
        from: 'License Controller',
        to: userEmail,
        subject: template.title,
        text: template.text
    }
    transporter.sendMail(options);
}

module.exports = {
    sendUserRegistered, 
    sendProductCreated,
    sendProductRejected,
    sendProductReviewed,
    sendProductPayed
}