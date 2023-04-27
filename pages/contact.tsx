// pages/contact.tsx

import { useState } from 'react';
import Link from 'next/link';
import ReCAPTCHA, { ReCAPTCHAChangeEvent } from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LceiMMlAAAAAO5n26Uk_6lZkSUqZ-lTQRH9EmY4'; // 上で取得したサイトキーを入力

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
  
    // APIルートを呼び
    // APIルートを呼び出し、メールを送信
    const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
    });

    const data = await response.json();

    if (response.status === 200) {
        alert(data.message);
        setEmail('');
        setMessage('');
    } else {
        alert(`メールの送信に失敗しました。エラー: ${data.error}`);
    }
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
