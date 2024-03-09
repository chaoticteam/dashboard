/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	swcMinify: true,
  publicRuntimeConfig: {
		API_URL: process.env.API_URL,
		BASE_URL: process.env.BASE_URL || "",
	},
  images: {
		unoptimized : true
	},
	distDir:"build",
  output: 'export',
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
};
export default nextConfig;
