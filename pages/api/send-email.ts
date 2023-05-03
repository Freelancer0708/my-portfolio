import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "sv10720.xserver.jp",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // 管理者へのメール
      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER,
        subject: "お問い合わせが届きました",
        text: `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`,
      });

      // 自動返信メール
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "お問い合わせありがとうございます",
        text: `${name} 様\n\nお問い合わせいただきありがとうございます。\n担当者が確認次第、返信させていただきます。\n\n以下、お問い合わせ内容の確認です。\n\nお名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}\n\n- System Yourself`,
      });

      res.status(200).json({ message: "メールが送信されました。" });
    } catch (error) {
    res.status(500).json({ message: "メールの送信に失敗しました。", error });
    }
    } else {
    res.status(405).json({ message: "許可されていないリクエストメソッドです。" });
    }
    };
    
    export default handler;
