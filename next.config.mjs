/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.11.42"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
