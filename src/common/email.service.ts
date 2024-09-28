import nodemailer from "nodemailer";
import config from "../../config";
import ErrorAPI from "./ErrorAPI";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: config.mail_account,
    pass: config.mail_password,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export default async function sendEmail({ from, to, subject, text, body }) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `<noreply@gmail.com> ${from || config.mail_account}`, // sender address
      to, // list of receivers
      subject: subject || "Hello ✔", // Subject line
      text, // plain text body
      html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    throw ErrorAPI.internal(error.message);
  }

  return true;
}
