/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages:["mongoose"],
        serverActions: true,
    },
    exportPathMap:async function (

      ) {
        return {
          '/': { page: '/note' },

        }
      },
}

module.exports = nextConfig
