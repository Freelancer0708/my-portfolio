import Link from 'next/link';

const IndexPage = () => {
  return (
    <div>
      <h1>My Portfolio</h1>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
};

export default IndexPage;
