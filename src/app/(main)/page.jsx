import { Button } from '@/components/shared/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h2 className="text-center text-lg font-bold mb-4">
        Painterly Customizer
      </h2>
      <div className="text-center">
        <Button className="btn-lg btn-wide mx-auto" asChild>
          <Link href="/customizer">Customizer</Link>
        </Button>
      </div>
    </>
  );
}