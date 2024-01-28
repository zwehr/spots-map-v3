/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zfldoydilnfavwhlbhzz.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};
