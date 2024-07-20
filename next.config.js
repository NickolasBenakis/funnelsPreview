/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
