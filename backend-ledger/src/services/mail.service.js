const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});


transporter.verify()
    .then(() => {
        console.log('Ready to send emails');
    })
    .catch((error) => {
        console.error('Error in email configuration:', error);
    });


const sendEmail = async ({ to, subject, html }) => {

    const info = await transporter.sendMail({
        from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
};


async function sendRegistrationEmail({ name, email }) {
    const subject = 'Welcome to Backend Ledger!';
    const html = `<h1>Hi ${name}, welcome to Backend Ledger!</h1><p>We're excited to have you join our community.</p>`;


    await sendEmail({ to: email, subject, html });
}


module.exports = {
    sendRegistrationEmail
};