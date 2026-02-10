import type { NextConfig } from "next";

// Use basePath only in production (deployment)
const isProd = process.env.NODE_ENV === 'production';
const basePathValue = isProd ? '/getthingsdone' : '';

const nextConfig: NextConfig = {
  basePath: basePathValue,
  assetPrefix: basePathValue,
  env: {
    // Expose basePath to client-side code
    NEXT_PUBLIC_BASEPATH: basePathValue,
  },
};

export default nextConfig;
