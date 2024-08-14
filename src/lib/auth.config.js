export const AuthAdminConfig = {
  basePath: '/auth',
  callbacks: {
    jwt({ token, user }) {
      if (!user) return token; // Don't modify token if it's not our token
      token.id = user.id;
      token.name = user.name;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.admin = token.admin;
      session.user.regions = token.regions;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login'
  },
  cookies: {
    sessionToken: {
      name: 'painterly.session_token'
    },
    callbackUrl: {
      name: 'painterly.callback_url'
    },
    csrfToken: {
      name: 'painterly.csrf'
    }
  },
  redirectCookie: 'painterly.redirect_to',
  providers: [] // This array intentionally left blank
};