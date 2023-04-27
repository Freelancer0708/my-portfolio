import Link from 'next/link';

const AboutPage = () => {
  return (
    <div>
      <h1>About Me</h1>
      <p>ここに自己紹介を書いてください。</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default AboutPage;
