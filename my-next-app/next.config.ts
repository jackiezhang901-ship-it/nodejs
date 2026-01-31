/** @type {import('next').NextConfig} */
const nextConfig = {

  // 代理配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ]
  },
};

// 导出配置
module.exports = nextConfig;
