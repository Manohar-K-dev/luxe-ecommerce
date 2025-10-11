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
    console.log("📧 Using GMAIL:", process.env.GMAIL);

    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 587, // Changed to 587 (TLS)
      secure: false, // Use TLS
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GPASS,
      },
    });

    // Verify connection
    await transport.verify();
    console.log("✅ SMTP connection verified");

    const mailOptions = {
      from: `LUXE <${process.env.GMAIL}>`,
      to: email,
      subject: subject,
      text: text,
    };

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
