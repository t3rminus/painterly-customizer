import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthAdminConfig } from './auth.config';
import { getUserByEmail, getUserById, updateLastLogin } from './db/user';
const bcrypt = require('bcryptjs');

const nextAuth = NextAuth({
  ...AuthAdminConfig,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Email',
      async authorize(credentials) {
        try {
          const admin = await getUserByEmail(credentials.email);

          if (admin) {
            const passwordsMatch = await bcrypt.compare(
              credentials.password,
              admin.password
            );
            if (passwordsMatch) {
              await updateLastLogin(admin.id);
              return {
                id: admin.id,
                name: admin.name,
                email: admin.email
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
  const { user = null } = (await auth()) || {};
  if (user && user.id) {
    return getUserById(user.id);
  }
  return user;
};
export const isFullAdmin = async () => {
  const user = await getUser();
  return !!user && user.role === 'full';
};
