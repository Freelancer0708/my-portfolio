import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    email: '',
    message: '',
    recaptchaResponse: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptcha = (value: string) => {
    setFormState((prev) => ({ ...prev, recaptchaResponse: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.recaptchaResponse) {
      alert('reCAPTCHAのチェックが必要です。');
      return;
    }

    try {
      // Verify reCAPTCHA
      const recaptchaRes = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recaptchaResponse: formState.recaptchaResponse }),
      });

      if (!recaptchaRes.ok) {
        alert('reCAPTCHAの検証に失敗しました。もう一度お試しください。');
        return;
      }

      // Send email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formState.email, message: formState.message }),
      });

      if (response.ok) {
        alert('メールが正常に送信されました。');
        setFormState({ email: '', message: '', recaptchaResponse: '' });
      } else {
        const data = await response.json();
        alert(`メールの送信に失敗しました。エラー: ${JSON.stringify(data.error)}`);
      }
    } catch (error) {
      console.error(error);
      alert('通信エラーが発生しました。');
    }
  };

  return (
    <div>
      <h1>お問い合わせフォーム</h1>
      <form onSubmit={handleSubmit}>
        <label>
          メールアドレス（必須）:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          お問い合わせ内容（必須）:
          <textarea
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <br />
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={handleRecaptcha} />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Contact;
