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
    host: "svXX.xserver.jp",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Set mail options for the recipient
  const mailOptionsRecipient = {
    from: process.env.EMAIL_USER,
    to: "info@test-server00.xyz",
    subject: "お問い合わせフォーム",
    text: `
      送信者: ${email}
      お問い合わせ内容:
      ${message}
    `,
  };

  // Set mail options for the sender (auto-reply)
  const mailOptionsSender = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "お問い合わせフォーム - 自動返信",
    text: `
      お問い合わせありがとうございます。
      以下の内容でお問い合わせを受け付けました。

      お問い合わせ内容:
      ${message}

      弊社からの返信をお待ちください。
    `,
  };

  // Send emails
  try {
    await transporter.sendMail(mailOptionsRecipient);
    await transporter.sendMail(mailOptionsSender);
    res.status(200).json({ message: "メールが正常に送信されました。" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "メールの送信に失敗しました。", error });
  }
};

export default handler;
