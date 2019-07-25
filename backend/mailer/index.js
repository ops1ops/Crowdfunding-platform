const nodemailer = require('nodemailer');
const { auth } = require('../config/keys').mailer;
const { HOST } = require('../config/config');

const setupTransport = () => nodemailer.createTransport({
    auth,
    service: 'gmail',
});

module.exports = async function sendConfirmationEmail(userEmail, userToken) {
    const transport = setupTransport();
    const URL = `${HOST}/api/confirm/${userToken}`;

    const email = {
        from: '"Crowdfunding platform" <613802bsuir@gmail.com>',
        to: userEmail,
        subject: "Confirmation email",
        html: `
        <h2>Crowdfunding platform confirmation email</h2>
        <p>Please confirm your email by clicking on the link below.</p>
        <a href="${URL}">Click to confirm</a>
        `
    };

    await transport.sendMail(email);
};