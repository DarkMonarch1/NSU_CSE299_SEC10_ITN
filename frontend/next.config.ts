import type { NextConfig } from "next";

const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(
  /\/+$/,
  "",
);

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    // Only use rewrites in development for local testing
    // In production, use direct API calls via NEXT_PUBLIC_API_URL
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/backend/:path*",
          destination: `${apiUrl}/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
