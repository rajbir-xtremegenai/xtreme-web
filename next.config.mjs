/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    deviceSizes: [480, 768, 1200], // responsive sizes
    imageSizes: [300, 600],        // thumbnails
    minimumCacheTTL: 10512000,     // ~4 months
    formats: ['image/webp'], // ✅ costing
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2jqk09lz8ece6.cloudfront.net',// local
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd1yxobs1qe5t8w.cloudfront.net',// prod
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
