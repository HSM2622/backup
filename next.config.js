/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   webpack5: true,
   webpack: (config) => {
      config.resolve.fallback = { fs: false, module: false };

      return config;
   },
  async rewrites() {
    return [
       {
          source: "/api/:path*",
          destination: "http://localhost:8000/api/:path*",
       },
    ];
 },
};

module.exports = nextConfig;
