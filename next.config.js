/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  mode: 'production',
});

const nextConfig = {
	reactStrictMode: false,
  productionBrowserSourceMaps: true,
	experimental: {
		...(process.env.NODE_ENV === "development" && { serverSourceMaps: true }),
	},
	images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
