'use server';
import { signIn } from '@/lib/auth';

export async function authenticate(callbackUrl, _prevState, formData) {
  try {
    await signIn('credentials', {
      redirectTo: callbackUrl,
      email: formData.get('email'),
      password: formData.get('password')
    });
  } catch (err) {
    if (err.type === 'CredentialsSignin') {
      return { error: 'That username or password was not recognized.' };
    } else {
      throw err;
    }
  }
}