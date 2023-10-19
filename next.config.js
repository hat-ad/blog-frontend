/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cf-assets.www.cloudflare.com",
      },
    ],
  },
};

module.exports = nextConfig;
