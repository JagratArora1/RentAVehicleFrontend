// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "rentavehicledocuments.s3.amazonaws.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com", // Allows all S3 subdomains
      },
      {
        protocol: "https",
        hostname: "rentvehicledoc.s3.ap-south-1.amazonaws.com", // Allows all S3 subdomains
      },
    ],
  },
};

export default nextConfig;

