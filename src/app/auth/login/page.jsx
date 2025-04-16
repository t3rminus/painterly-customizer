import { getUser } from '@/lib/auth';
import SignInForm from './form';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/shared/button';

export const metadata = {
  title: 'Beautifi Sign-in',
  description: ''
};

export default async function SignInPage({ searchParams }) {
  const { callbackUrl } = await searchParams;
  const user = await getUser();
  if (user) {
    return redirect('/');
  }

  return (
    <main className="w-full max-w-sm mx-auto">
      <SignInForm callbackUrl={callbackUrl} />
      <Button className="w-full mt-4" asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    </main>
  );
}
