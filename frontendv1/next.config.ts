import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The FastAPI backend is reached server-side via the /api/analyze route
  // handler, so no rewrites or CORS juggling are needed in the browser.
};

export default nextConfig;
