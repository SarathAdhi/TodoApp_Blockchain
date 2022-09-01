/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    TASK_CONTRACT_ADDRESS: process.env.TASK_CONTRACT_ADDRESS,
  },
};

module.exports = nextConfig;
