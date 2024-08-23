import Link from 'next/link';

export function Header() {
  return (
    <h1 className="text-3xl text-center p-4 mb-4">
      <Link href="/">
        Painterly Pack Continuation
      </Link>
    </h1>
  );
}