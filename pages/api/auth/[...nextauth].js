import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    FacebookProvider({
      idToken: true,
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET,

      authorization: {
        url: "https://www.facebook.com/v15.0/dialog/oauth",
        params: {
          client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
          scope: "openid email",
          response_type: "code",
        },
      },

      // wellKnown: "https://www.facebook.com/.well-known/openid-configuration/",
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
  ],
};

export default NextAuth(authOptions);
