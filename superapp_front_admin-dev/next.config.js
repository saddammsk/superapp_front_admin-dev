// next.config.js

module.exports = {
  env: {
      BASE_URL: process.env.BASE_URL,
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
      nextAppApiUrl: "https://super.xertify.co:",
      localServer: "https://super.xertify.co:5000",
  },
  images: {
      remotePatterns: [{
              protocol: 'https',
              hostname: 'cdn1.iconfinder.com'
          },
          {
              protocol: 'https',
              hostname: 'cdn3.iconfinder.com'
          },
          {
              protocol: 'https',
              hostname: 'cdn4.iconfinder.com'
          },
          {
              protocol: 'https',
              hostname: 'img.freepik.com'
          },
          {
            protocol: 'https',
            hostname: 'public-saw.s3.amazonaws.com'
        },
      ],
  },
};