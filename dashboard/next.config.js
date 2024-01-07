/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost:3000", "18.193.97.14"],
      allowedOrigins: ["192.168.0.45:3000", "18.193.97.14"],
    },
  },
};

module.exports = nextConfig;
