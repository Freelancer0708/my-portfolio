// pages/api/send-email.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, message } = req.body;

    // Nodemailerの設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER, // 送信元のGmailアドレス
        pass: GMAIL_PASS, // 送信元のGmailパスワード
      },
    });

    // お問い合わせメールの内容
    const mailOptions = {
      from: email,
      to: 'info@test-server00.xyz',
      subject: 'お問い合わせ',
      text: message,
    };

    // 自動返信メールの内容
    const autoReplyOptions = {
      from: 'info@test-server00.xyz',
      to: email,
      subject: 'お問い合わせありがとうございます',
      text: 'お問い合わせいただきありがとうございます。追ってご連絡差し上げます。',
    };

    try {
      // お問い合わせメールを送信
      await transporter.sendMail(mailOptions);

      // 自動返信メールを送信
      await transporter.sendMail(autoReplyOptions);

      res.status(200).json({ message: 'メールが送信されました' });
    } catch (error) {
      res.status(500).json({ message: 'メールの送信に失敗しました', error });
    }
  } else {
    res.status(405).json({ message: '許可されていないHTTPメソッドです' });
  }
}
