/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['skate-tourism-spot-images.s3.us-east-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
