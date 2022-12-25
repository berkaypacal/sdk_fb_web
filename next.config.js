/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/__/auth/",
        destination: `https://sdkverocity.firebaseapp.com/__/auth/`,
      },
    ];
  },
};

module.exports = nextConfig;
