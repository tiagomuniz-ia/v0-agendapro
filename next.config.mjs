/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },
  // Otimizações de performance
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    // Otimização de módulos
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  // Otimização de página
  pageExtensions: ['tsx', 'ts'],
  poweredByHeader: false,
}

export default nextConfig
