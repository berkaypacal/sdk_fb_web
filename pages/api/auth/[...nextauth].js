import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  idToken: true,
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_ClIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SECRET,
      idToken: true,
      authorization: {
        url: "https://www.facebook.com/v15.0/dialog/oauth",
        params: {
          client_id: process.env.NEXT_PUBLIC_ClIENT_ID,
          scope: "openid email",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
