// import nodemailer from "nodemailer";

import { getEnv } from "@/utils/getEnv";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: getEnv("SMTP_HOST"),
  secure: true,
  port: getEnv("SMTP_PORT"),
  auth: {
    user: getEnv("SMTP_USER"),
    pass: getEnv("SMTP_PASS"),
  },
});

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

const sendEmail = async (options: MailOptions) => {
  console.log(
    "Sending email for ",
    options.to,
    " with subject ",
    options.subject
  );
  await transporter.sendMail(options);
};

const sendEmailVerification = async (recepient: string, otp: string) => {
  try {
    const validity = Number(getEnv("OTP_EXPIRY_IN_MILLI_SECONDS")) / 60000; // Convert OTP_EXPIRY_IN_MILLI_SECONDS to minutes
    const contactUsMail = getEnv("CONACT_US_MAIL");
    const mailOptions = {
      from: getEnv("FROM_MAIL"),
      to: recepient,
      subject: "Verify your email",
      html: `<p>Hi,</p>
      <p>Please enter the following OTP code to verify your email: ${otp}</p>
      <p>This code is valid for ${validity} minutes, and is for your use only. Do not share it with anyone.</p>
      <p>If you did not request this verification or have any questions, please contact us at <a href="mailto:${contactUsMail}">${contactUsMail}</a></p>
      <p>Thanks,</p>
      <p>LinkDOT</p>
      `,
    };

    await sendEmail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export { sendEmailVerification };
