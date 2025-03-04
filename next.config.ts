import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rentavehicleimages.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
