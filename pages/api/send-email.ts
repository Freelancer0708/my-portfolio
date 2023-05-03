import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Nodemailerのトランスポーターを設定
    const transporter = nodemailer.createTransport({
      host: 'sv10720.xserver.jp',
      port: 465,
      secure: true, // SSL/TLSを使用する場合はtrue
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // メールの内容を設定
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: 'info@test-server00.xyz',
      subject: 'お問い合わせ',
      text: `名前: ${req.body.name}\nメールアドレス: ${req.body.email}\nお問い合わせ内容:\n${req.body.message}`,
      replyTo: req.body.email,
    };

    // お問い合わせ者に自動返信メールの内容を設定
    const autoReplyMailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: req.body.email,
      subject: 'お問い合わせありがとうございます',
      text: `以下の内容でお問い合わせを受け付けました。\n\n名前: ${req.body.name}\nメールアドレス: ${req.body.email}\nお問い合わせ内容:\n${req.body.message}\n\n追ってご連絡いたします。`,
    };

    // メールを送信
    try {
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(autoReplyMailOptions);
      res.status(200).json({ status: 'Email sent' });
    } catch (error) {
      console.error('Email sending failed:', error);
      res.status(500).json({ status: 'Email sending failed', error });
    }
  } else {
    res.status(405).json({ status: 'Method not allowed' });
  }
}

export default handler;
