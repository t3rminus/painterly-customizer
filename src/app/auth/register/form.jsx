'use client';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { register as submitRegister } from './actions';
import { Input } from '@/components/shared/input';
import { Button } from '@/components/shared/button';
import Link from 'next/link';
import { ArrowBackOutline, LockClosedOutline, MailOutline } from '@raresail/react-ionicons';

export default function RegistrationForm({ callbackUrl }) {
  const [errorMessage, dispatch] = useActionState(
    submitRegister.bind(null, callbackUrl)
  );
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  return (
    <form action={handleSubmit(dispatch)} className="flex flex-col gap-4">
      <Input
        label="Name"
        type="text"
        placeholder="Nickname8"
        inputClassName="input-bordered"
        icon={<MailOutline className="w-5 h-5" />}
        {...register('name', {
          required: 'Please enter a name'
        })}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        autoComplete="email"
        inputClassName="input-bordered"
        icon={<MailOutline className="w-5 h-5" />}
        {...register('email', {
          required: 'Please enter an email',
          pattern: { value: /.+@.+/g, message: 'Please enter a valid email' }
        })}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        inputClassName="input-bordered"
        icon={<LockClosedOutline className="w-5 h-5" />}
        {...register('password', { required: 'Please enter a password' })}
        error={errors.password}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        inputClassName="input-bordered"
        icon={<LockClosedOutline className="w-5 h-5" />}
        {...register('confirmpassword', {
          validate: (val, formVals) =>
            val === formVals.password || 'Passwords must match'
        })}
        error={errors.confirmpassword}
      />
      {!!errorMessage && (
        <div className="alert alert-error text-white rounded-btn">
          <span>{errorMessage?.error}</span>
        </div>
      )}
      <div className="card-actions justify-end pt-4">
        <Button type="submit" className="w-full btn-neutral">
          Register
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
