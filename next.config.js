/** @type {import('next').NextConfig} */

// const path = require('path')
const nextConfig = {
   // images: {
   //    remotePatterns: [{
   //       protocol: "https",
   //       hostname: "placehold.jp"
   //    }]
   // }
   // webpack: (config, options) => {
   //    config.resolve.alias['react-toastify'] = path.join(__dirname, './node_modules/react-toastify')
   //    config.resolve.alias[''] = path.join(__dirname, './node_modules/react-toastify')

   //    return config
   // }
   // fastRefresh: true,
   images: {
      
      remotePatterns: [
         {
            protocol: "https",
            hostname: 'next-js-recipe-list.onrender.com/',
            port: "10000"
         },
         {
            hostname: '127.0.0.1',
         },
         {
            protocol: "http",
            hostname: 'localhost',
            port: "3000",
         },
      ],
   },
   optimizeFonts: false,
   productionBrowserSourceMaps: false,
   swcMinify: true,
   // webpack: (config) => {
   /* On `node-fetch` v2, that `supabase-js` uses,
  `encoding` package was optionally required for `.textConverted`
  which means it wasn't in `node-fetch` deps.
  See: https://github.com/node-fetch/node-fetch/issues/412.
  Since `encoding` is not part of the deps by default, when using with webpack,
  it will raise a warning message.
  This can be ignored as it doesn't prevent anything to work well. */
   //    config.ignoreWarnings = [
   //       { module: /node_modules\/node-fetch\/lib\/index\.js/ },
   //       { file: /node_modules\/node-fetch\/lib\/index\.js/ },
   //    ]

   //    return config
   // },
}

module.exports = nextConfig
