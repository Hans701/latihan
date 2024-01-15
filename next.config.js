const nextConfig = {}
// next.config.js
module.exports = {
    // basePath: '/pages',
    pageExtensions: ['tsx', 'ts'], // You might need to adjust this based on your project setup.
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'rickandmortyapi.com',
          port: '443',
          pathname: '/api/character/avatar/:id.jpeg',
        },
      ],
    },    
};
