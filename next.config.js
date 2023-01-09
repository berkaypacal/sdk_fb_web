/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://sdkverocity.firebaseapp.com/__/auth/:path*`,
      },
      // {
      //   source: "/apple-app-site-association",
      //   destination: "/public/apple-app-site-association.json",
      // },
    ];
  },
  async headers() {
    return [
      {
        source: "/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
};
