require("dotenv").config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async (data) => {
  console.log(data);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Truong An Ngo <ngtrn.an99@gmail.com>", // sender address
    to: data.email, // list of receivers
    subject: "Xác nhận đặt lịch khám bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyEmail(data), // html body
  });
};

const getBodyEmail = (data) => {
  console.log(data.redirectLink);
  let result = "";
  if (data.language === "en") {
    result = `
    <h3>Hi ${data.fullName}! </h3>
    <p>You received this email because you has booked an online medical appointment on my website.</p>
    <p>Schedule Detail:</p>
    <div><b>Time: ${data.selectedSchedule}</b></div>
    <div><b>Doctor: ${data.doctorName}</b></div>
    <div><b>If this informations is true. Please click on the link to complete your booking. Sincerely thank! </b></div>
    <div><a href="${data.redirectLink}" target="_blank">This link</a></div>
    `;
  }
  if (data.language === "vi") {
    result = `
    <h3>Xin chào ${data.fullName}! </h3>
    <p>Bạn nhận được email này vì đã để lại thông tin đặt lịch khám bệnh tại website</p>
    <p>Thông tin lịch khám:</p>
    <div><b>Thời gian: ${data.selectedSchedule}</b></div>
    <div><b>Bác sĩ: ${data.doctorName}</b></div>
    <div><b>Nếu thông tin trên là đúng. Vui lòng truy cập đường link bên dưới để hoàn tất đặt lịch khám. Xin chân thành cảm ơn! </b></div>
    <div><a href="${data.redirectLink}" target="_blank">Link</a></div>
    `;
  }
  return result;
};
const sendAttachment = async (data) => {
  console.log(data);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Truong An Ngo <ngtrn.an99@gmail.com>", // sender address
    to: data.remedyData.patientEmail, // list of receivers
    subject: "Xác nhận đặt lịch khám bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyEmailRemedy(data), // html body
    attachments: [
      {
        filename:
          data.remedyData.patientId + "" + data.remedyData.date + ".png",
        content: data.remedyBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};

const getBodyEmailRemedy = (data) => {
  console.log(data);
  let result = "";
  if (data.remedyData.language === "en") {
    result = `
    <h3>Hi ${data.remedyData.patientName}! </h3>
    <p>You received this email because you has finished a medical appointment on BookingCare.</p>
   
    <div><b>Sincerely thank! </b></div>
    `;
  }
  if (data.remedyData.language === "vi") {
    result = `
    <h3>Xin chào ${data.remedyData.patientName}! </h3>
    <p>Bạn nhận được email này vì đã hoàn tất lịch khám bệnh tại BookingCare</p>
    <div><b>Đính kèm dưới đây là thông tin chi tiết toa thuốc của bạn. Đội ngũ BookingCare xin chân thành cảm ơn! </b></div>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail,
  sendAttachment,
};
