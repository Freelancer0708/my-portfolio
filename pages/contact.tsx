import React, { useState } from "react";
import axios from "axios";

const Contact: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/send-email", {
        email,
        message,
      });

      setResult(response.data.message);
      setEmail("");
      setMessage("");
    } catch (error) {
      setResult(`メールの送信に失敗しました。エラー: ${JSON.stringify(error.response.data)}`);
    }
  };

  return (
    <div>
      <h1>お問い合わせフォーム</h1>
      <form onSubmit={handleSubmit}>
        <label>
          メールアドレス（必須項目）:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          お問い合わせ内容（必須項目）:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">送信</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default Contact;
