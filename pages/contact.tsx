import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 他のバリデーションやリキャプチャの検証をここで行う
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });

    if (response.ok) {
      alert("メールが送信されました。ありがとうございます！");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      const { message } = await response.json();
      setErrorMessage(message);
    }
  };

  return (
    <div className="contact-container">
      <h1>お問い合わせ</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">お名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">メッセージ</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Contact;