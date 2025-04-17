import { AuthError } from 'next-auth'
/*
This is a copy of authJS' default logger.

Since we can't extend it (only replace it)
it has been modified to not log CredentialsSignin errors
which occurr when a user enters an incorrect password,
to not spam the server logs.
*/

const red = '\x1b[31m';
const reset = '\x1b[0m';
const ignoredErrors = new Set([
  'UnknownAction',
  'CredentialsSignin',
  'OAuthAccountNotLinked',
  'AccountNotLinked'
]);

export const logger = {
  error(error) {
    const name = error instanceof AuthError ? error.type : error.name
    if (ignoredErrors.has(name)) {
      /* Don't bother logging certain errors as errors. */
      /* These are caused by dumb users such as bad passwords or mis-clicking URLs */
      return;
    }

    console.error(`${red}[auth][error]${reset} ${name}: ${error.message}`);
    if (
      error.cause &&
      typeof error.cause === 'object' &&
      'err' in error.cause &&
      error.cause.err instanceof Error
    ) {
      const { err, ...data } = error.cause
      console.error(`${red}[auth][cause]${reset}:`, err.stack)
      if (data)
        console.error(
          `${red}[auth][details]${reset}:`,
          JSON.stringify(data, null, 2)
        )
    } else if (error.stack) {
      console.error(error.stack.replace(/.*/, '').substring(1))
    }
  }
}