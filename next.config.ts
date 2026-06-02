import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "."),
  // Use webpack for build (next-pwa requires webpack)
  turbopack: {},
};

export default withPWA(nextConfig);
