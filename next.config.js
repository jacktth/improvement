/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages:["mongoose"],
        serverActions: true,
    },
    exportPathMap:async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
      ) {
        return {
          '/': { page: '/note' },

        }
      },
}

module.exports = nextConfig
