const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    // // tls: {
    // //     rejectUnauthorized: false
    // // },
    // secure: true, // true for 465, false for other ports
    // auth: {
    //   user: process.env.MAIL_USER, // generated ethereal user
    //   pass: process.env.MAIL_PASSWORD, // generated ethereal password
    // },
    host: "smtp.mail.yahoo.com", // hostname
    port: 587, // port for secure SMTP
    secure: false,
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
  });

  const sendEmail = async (email, subject, token) => {
    try {
        await transporter.sendMail({
            from: `Oasis Library 🌴 <${process.env.MAIL_USER}>'`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hello world!🦸‍♀️", // plain text body
            html: `
            <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
            <tr>
              <td style="background-color: #ecf0f1">
                <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                  <h2 style="color: #287ccb; margin: 0 0 7px">Welcome to Oasis Library.</h2>
                  <p style="margin: 2px; font-size: 15px">
                  Click the link below to verify your e-mail and start browsing our web !</p>
                  <br>
                  <div style="width: 100%; text-align: center">
                    <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href= "https://oasislibrary-production.up.railway.app/users/activateAccount/${token}">Verify e-mail</a>	
                  </div>
                  <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Oasis Library 2022</p> 
                </div>
              </td>
            </tr>
            </table>
            `, // html body
          });
    } catch (error) {
        console.log(error.message);
    }
  }

  module.exports = {
    sendEmail
  }