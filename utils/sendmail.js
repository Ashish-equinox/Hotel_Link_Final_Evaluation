const nodemailer = require("nodemailer");

async function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mitrachirayu@gmail.com",
      pass: "gupf nvyh jexv kwke",
    },
  });
}

async function sendmail(to, subject, html) {
  try {
    const transporter = await createTransport();
    let mailOptions = {
      from: "mitrachirayu@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("error at sending mail", error);
  }
}

module.exports = sendmail;
