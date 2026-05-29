import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Evita que el servidor de Next descargue Unsplash (suele dar 403)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
