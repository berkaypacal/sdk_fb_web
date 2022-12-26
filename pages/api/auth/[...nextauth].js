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
      token: {
        url: "https://graph.facebook.com/oauth/access_token",
        async request(context) {
          try {
            // request to https://graph.facebook.com/oauth/access_token?code=""&client_id=""&redirect_uri=""&client_secret=""
            const response = await axios.get(this.url, {
              params: {
                code: context.params.code,
                client_id: context.provider.clientId,
                redirect_uri: context.provider.callbackUrl,
                client_secret: context.provider.clientSecret,
              },
            });

            const tokens = response.data;
            return { tokens };
          } catch (error) {
            throw error;
          }
        },
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
