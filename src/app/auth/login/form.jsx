'use client';
import { useActionState } from 'react';
import { authenticate } from './actions';
import { Input } from '@/components/shared/input';
import { Button } from '@/components/shared/button';
import Link from 'next/link';
import {
  ArrowBackOutline,
  LockClosedOutline,
  MailOutline
} from '@raresail/react-ionicons';

export default function SignInForm({ callbackUrl }) {
  const [errorMessage, dispatch] = useActionState(
    authenticate.bind(null, callbackUrl)
  );
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="email@example.com"
        autoComplete="email"
        icon={<MailOutline className="w-5 h-5" />}
        inputClassName="input-bordered"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        autoComplete="current-password"
        icon={<LockClosedOutline className="w-5 h-5" />}
        inputClassName="input-bordered"
      />
      {!!errorMessage && (
        <div className="alert alert-error text-white rounded-btn">
          <span>{errorMessage?.error}</span>
        </div>
      )}
      <div className="card-actions justify-end pt-4">
        <Button type="submit" className="w-full btn-neutral">
          Submit
        </Button>
        <Button asChild className="w-full btn-ghost">
          <Link href="/">
            <ArrowBackOutline className="w-5 h-5" />
            Back to Painterly
          </Link>
        </Button>
      </div>
    </form>
  );
}
