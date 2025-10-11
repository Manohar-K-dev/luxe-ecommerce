// import { createTransport } from "nodemailer";

// const sendMail = async (email, subject, text) => {
//   const transport = createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     auth: {
//       user: process.env.GMAIL,
//       pass: process.env.GPASS,
//     },
//   });

//   await transport.sendMail({
//     from: process.env.GMAIL,
//     to: email,
//     subject,
//     text,
//   });
// };

// export default sendMail;

import { createTransport } from "nodemailer";

const sendMail = async (email, subject, text) => {
  try {
    console.log("📧 Attempting to send email to:", email);

    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GPASS,
      },
      // Add connection timeout settings
      connectionTimeout: 10000, // 10 seconds
      socketTimeout: 15000, // 15 seconds
      greetingTimeout: 10000, // 10 seconds
      // Add TLS options
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("📧 Verifying SMTP connection...");
    await transport.verify();
    console.log("✅ SMTP connection verified");

    const mailOptions = {
      from: `LUXE <${process.env.GMAIL}>`,
      to: email,
      subject: subject,
      text: text,
    };

    console.log("📧 Sending email...");
    const result = await transport.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", result.messageId);

    return result;
  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error("Error:", error.message);
    console.error("Error code:", error.code);
    console.error("Error response:", error.response);
    throw error;
  }
};

export default sendMail;
