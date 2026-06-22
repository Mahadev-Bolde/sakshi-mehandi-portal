import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendMail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Sakshi Mehendi" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
