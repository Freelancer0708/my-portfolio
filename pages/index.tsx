import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>フロントエンドエンジニアのポートフォリオ</title>
        <meta name="description" content="フロントエンドエンジニアのポートフォリオサイト" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container">
        <Hero />
        <Skills />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}
