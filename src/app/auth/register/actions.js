'use server';
import { signIn } from '@/lib/auth';
import { createUser } from '@/lib/db/user';
import bcrypt from 'bcryptjs';

export async function register(callbackUrl, _prevState, formData) {
  const email = `${formData.email}`.toLowerCase();
  await createUser({
    user: email,
    password: await bcrypt.hash(formData.password, 12)
  });

  try {
    await signIn('credentials', {
      redirectTo: callbackUrl,
      email: email,
      password: formData.password
    });
  } catch (err) {
    if (err.type === 'CredentialsSignin') {
      return { error: 'That username or password was not recognized.' };
    } else {
      throw err;
    }
  }
}