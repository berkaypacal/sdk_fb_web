/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://sdkverocity.firebaseapp.com/__/auth/:path*`,
      },
      {
        source: ".well-known/apple-app-site-association",
        destination: ".well-known/apple-app-site-association.json",
      },
    ];
  },
};
