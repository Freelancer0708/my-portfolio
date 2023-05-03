import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "sv10720.xserver.jp",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: email,
        to: "info@system-yourself.com",
        subject: `New message from ${name}`,
        text: message,
      });

      // 自動返信
      await transporter.sendMail({
        from: "info@system-yourself.com",
        to: email,
        subject: "Thank you for contacting us",
        text: `Dear ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nYour Company`,
      });

      res.status(200).send("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email.");
    }
  } else {
    res.status(405).send("Method not allowed.");
  }
};

export default handler;
