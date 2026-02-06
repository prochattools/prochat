// ProKit – ProChat's developer core boilerplate
// (c) 2025 Steve Westhoek / ProChat
/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		PROCHAT_VERSION: process.env.PROCHAT_VERSION,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			// Next.js <Image> needs remote domains allowlisted.
			// Keep this list intentionally small; add domains only when needed.
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
		],
	},
}

module.exports = nextConfig
