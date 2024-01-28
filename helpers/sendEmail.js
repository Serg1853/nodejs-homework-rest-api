const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "sergey24226@gmail.com" };
    await sgMail.send(email);
    return true;
}

// const email = {
//     to: "sergey1853@MediaMetadata.ua",
//     from: "sergey24226@gmail.com",
//     subject: "Test email",
//     html: "<p><strong>Test email</strong>from localhost:3000</p>"
// };

// sgMail.send(email)
//     .then(() => console.log("Email send success"))
//     .catch(error => console.log(error.message))

module.exports = sendEmail;