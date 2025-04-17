import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthAdminConfig } from './auth.config';
import { getUserByEmail, getUserById, updateLastLogin } from './db/user';
import bcrypt from 'bcryptjs';
import { logger } from './auth.logger';

const nextAuth = NextAuth({
  ...AuthAdminConfig,
  logger,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Email',
      async authorize(credentials) {
        try {
          const user = await getUserByEmail(
            `${credentials.email}`.toLowerCase()
          );

          if (user) {
            const passwordsMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (passwordsMatch) {
              await updateLastLogin(user.id);
              return {
                id: user.id,
                name: user.name,
                email: user.email
              };
            }
          }
        } catch (err) {}

        return null;
      }
    }),
    CredentialsProvider({
      id: 'update-signin',
      async authorize(credentials) {
        await updateLastLogin(credentials.id);
        return {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email
        };
      }
    })
  ]
});

export default nextAuth;
export const { auth, signIn, signOut } = nextAuth;
export const { GET, POST } = nextAuth.handlers;
export const getUser = async () => {
  let { user = null } = (await auth()) || {};
  if (user && user.id) {
    user = await getUserById(user.id);
  }
  return user ? { id: user.id, email: user.email } : null;
};
export const isFullAdmin = async () => {
  const user = await getUser();
  return !!user && user.role === 'full';
};
