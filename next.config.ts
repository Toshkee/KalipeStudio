import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF je za fotografije ~20–30% manji od WebP-a. Sve slike su lokalne i
    // već u 1080px, pa je skuplje kodiranje samo pri prvom zahtjevu.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
