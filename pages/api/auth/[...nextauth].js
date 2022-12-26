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
      authorization: { params: { scope: "openid" } },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
