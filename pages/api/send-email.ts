import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, message } = req.body;

  // Configure mail transporter
  const transporter = nodemailer.createTransport({
    host: "sv10720.xserver.jp",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Set mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "freelancernoaccont@gmail.com",
    subject: "お問い合わせフォーム",
    text: `
      送信者: ${email}
      お問い合わせ内容:
      ${message}
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "メールが正常に送信されました。" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "メールの送信に失敗しました。", error });
  }
};

export default handler;
