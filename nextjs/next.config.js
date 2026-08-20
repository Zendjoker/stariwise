/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: { formats: ["image/avif", "image/webp"] },
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE ?? "/api",
  },
};
module.exports = nextConfig;
