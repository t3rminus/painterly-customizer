import RegistrationForm from './form';
import Link from 'next/link';
import { Button } from '@/components/shared/button';

export const metadata = {
  title: 'Beautifi Sign-in',
  description: ''
};

export default function RegisterPage({ searchParams: { callbackUrl } = {} }) {
  return (
    <main className="w-full max-w-sm mx-auto">
      <RegistrationForm callbackUrl={callbackUrl} />
      <Button className="w-full mt-4" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
    </main>
  );
}