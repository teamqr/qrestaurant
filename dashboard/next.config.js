/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost:3000", "192.168.0.45:3000"],
      allowedOrigins: ["192.168.0.45:3000"],
    },
  },
};

module.exports = nextConfig;
