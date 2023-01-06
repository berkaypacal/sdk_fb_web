/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://sdkverocity.firebaseapp.com/__/auth/:path*`,
      },
      {
        source: "/apple-app-site-association",
        destination: "/public/apple-app-site-association.json",
      },
    ];
  },
};
