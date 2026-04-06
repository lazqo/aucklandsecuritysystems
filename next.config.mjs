/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
  },
  // Uncomment and set when integrating as a subdirectory of the main domain:
  // basePath: '/camera-chooser',
}

export default nextConfig
