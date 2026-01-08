// next.config.js
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: false, // Keep TypeScript checking enabled
  },
};

export default config;