/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://sdkverocity.firebaseapp.com/__/auth/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
