/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		...(process.env.NODE_ENV === "development" && { serverSourceMaps: true }),
	},
};

module.exports = nextConfig;
