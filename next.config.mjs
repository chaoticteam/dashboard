/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
		API_URL: process.env.API_URL,
		BASE_URL: process.env.BASE_URL || "",
	},
};

export default nextConfig;
