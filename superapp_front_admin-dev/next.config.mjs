/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.BASE_URL,
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
      nextAppApiUrl: "https://super.xertify.co:",
      localServer: "https://super.xertify.co:5000",
    },
    /* async redirects() {
      return [
        {
          source: '/',
          destination: '/es/auth/login',
          permanent: true,
        },
      ]
    }, 
    basePath: "/es/auth/login", */
};

export default nextConfig;
