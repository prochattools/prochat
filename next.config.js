// ProChat marketing site – powered by the ProKit engine
// (c) 2025 Steve Westhoek / ProChat
/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/store',
				destination: '/kits',
				permanent: true,
			},
			{
				source: '/store/saaskit',
				destination: '/kits/saaskit',
				permanent: true,
			},
			{
				source: '/store/prokit',
				destination: '/kits/prokit',
				permanent: true,
			},
			{
				source: '/store/prokit/finish',
				destination: '/kits/prokit/finish',
				permanent: true,
			},
			{
				source: '/store/saaskit/finish',
				destination: '/kits/saaskit/finish',
				permanent: true,
			},
			{
				source: '/tos',
				destination: '/terms',
				permanent: true,
			},
			{
				source: '/privacy-policy',
				destination: '/privacy',
				permanent: true,
			},
			{
				source: '/waiting-list',
				destination: '/kits/uxkit-waitlist',
				permanent: true,
			},
			{
				source: '/blog/is-saaskit-worth-it-for-first-time-founders-honest-breakdown',
				destination: '/blog/is-saaskit-worth-it-for-first-time-founders-honest-evaluation',
				permanent: true,
			},
			{
				source: '/blog/is-saaskit-worth-it-for-first-time-founders',
				destination: '/blog/is-saaskit-worth-it-for-first-time-founders-honest-evaluation',
				permanent: true,
			},
		]
	},
	images: {
		remotePatterns: [
			// NextJS <Image> component needs to whitelist domains for src={}
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'pbs.twimg.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'logos-world.net',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'cdn-icons-png.flaticon.com',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'blogger.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'fast-strapi-cms-651b34b82e95.herokuapp.com',
			},
			{
				protocol: 'https',
				hostname: 'secure.gravatar.com',
			},
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'http',
				hostname: '3.73.130.136',
			},
			{
				protocol: 'https',
				hostname: '3.73.130.136',
			},
		],
	},
}

module.exports = nextConfig
