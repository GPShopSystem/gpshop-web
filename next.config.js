require('dotenv').config()
const path = require('path')


module.exports = {
	target: process.env.NEXT_TARGET || 'serverless',
	workboxOpts: {
		swDest: 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /[.](png|jpg|ico|css)/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'assets-cache',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /^https:\/\/code\.getmdl\.io.*/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'lib-cache'
				}
			},
			{
				urlPattern: /^http.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'http-cache'
				}
			}
		]
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
		  config.node = {
			fs: 'empty'
		  }
		}
	
		return config
	},
	env: {
		currency: process.env.CURRENCY,
	},
  eslint: {
    ignoreDuringBuilds: true,
  },
}