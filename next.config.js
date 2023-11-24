/** @type {import('next').NextConfig} */

const path = require('path')
const nextConfig = {
   // images: {
   //    remotePatterns: [{
   //       protocol: "https",
   //       hostname: "placehold.jp"
   //    }]
   // }
   webpack: (config, options) => {
      config.resolve.alias['react-toastify'] = path.join(__dirname, './node_modules/react-toastify')
      // config.resolve.alias[''] = path.join(__dirname, './node_modules/react-toastify')

      return config
   }
}

module.exports = nextConfig
