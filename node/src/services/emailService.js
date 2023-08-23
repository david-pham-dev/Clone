require('dotenv').config();
import nodemailer from 'nodemailer';
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: 'Thông Tin Đặt Lịch Khám Bệnh', // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};
let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: 'Kết Quả Đặt Lịch Khám Bệnh', // Subject line
        html: getBodyHTMLRemedy(dataSend),
        attachments: [
          {
            filename: `remedy - ${dataSend.patientName} - ${dataSend.patientId}`,
            content: dataSend.imgBase64.split('base64,')[1],
            encoding: 'base64',
          },
        ],
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `<h3>Xin chào ${dataSend.patientName}</h3>
    <p> Bạn nhận được email này vì đã đặt lịch khám bệnh thành công trên <b>CloneBookingCare.com</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Hãy nhấn vào link bên dưới để hoàn tất thủ tục khám bệnh</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Xác Nhận Lịch Khám</a></div>
    `;
  }
  if (dataSend.language === 'en') {
    result = `<h3>What's up ${dataSend.patientName}</h3>
    <p> Bạn nhận được email này vì đã đặt lịch khám bệnh thành công trên <b>CloneBookingCare.com</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Hãy nhấn vào link bên dưới để hoàn tất thủ tục khám bệnh</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Xác Nhận Lịch Khám</a></div>
    `;
  }
  return result;
};
let getBodyHTMLRemedy = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `<h3>Xin chào ${dataSend.patientName}</h3>
    <p> Bạn nhận được email này vì đã đặt lịch khám bệnh thành công trên <b>CloneBookingCare.com</p>
    <p>Thong tin hoa don torng file dinh kem</p>
    <div>
  </div>
    `;
  }
  if (dataSend.language === 'en') {
    result = `<h3>What's up ${dataSend.patientName}</h3>
    <p> You receied this email because abcd</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
  <div> Regards </div>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
