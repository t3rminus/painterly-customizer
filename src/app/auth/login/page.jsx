import SignInForm from './form';

export const metadata = {
  title: 'Beautifi Sign-in',
  description: ''
};

export default function SignInPage({ searchParams: { callbackUrl } = {} }) {
  return (
    <main className="w-full max-w-sm mx-auto">
      <SignInForm callbackUrl={callbackUrl} />
    </main>
  );
}