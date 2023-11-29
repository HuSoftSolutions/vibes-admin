/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental:{
		appDir: true
	},
	images: {
		remotePatterns: [
			{
				hostname: 'firebasestorage.googleapis.com'
			}
		]
	}
}

module.exports = nextConfig
