// Utility for OTP generation and delivery
import nodemailer from 'nodemailer';
import twilio from 'twilio';

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via SMS using Twilio
export async function sendOTPSMS(phone, otp) {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  return client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone
  });
}

// Send OTP via Email using Nodemailer
export async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`
  });
}
