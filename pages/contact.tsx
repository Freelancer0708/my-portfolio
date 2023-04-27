// pages/contact.tsx

import { useState } from 'react';
import Link from 'next/link';
import ReCAPTCHA, { ReCAPTCHAChangeEvent } from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6Ld7fsMlAAAAAE3q1OUKCovTNfq6ICzJPMoMJQ68'; // 上で取得したサイトキーを入力

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert('reCAPTCHAの確認を行ってください。');
      return;
    }

    // ここでAPIを呼び出して、お問い合わせ内容を送信します。
    alert('お問い合わせ内容を送信しました。');
  };

  return (
    <div>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">メールアドレス（必須）:</label>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="message">お問い合わせ内容（必須）:</label>
        <textarea
          id="message"
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={(value) => setRecaptchaValue(value as string)} />
        <br />
        <button type="submit">送信</button>
      </form>
      <Link href="/">Home</Link>
    </div>
  );
};

export default ContactPage;
