/** @type {import('next').NextConfig} */
const { withFrameworkConfig } = require("./framework/common/config");

const nextConfig = withFrameworkConfig({
  framework: {
    name: process.env.NEXT_PUBLIC_FRAMEWORK,
  },
  i18n: {
    locales: ["en-US", "es"],
    defaultLocale: "en-US",
  },
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
console.log("next.config.js", JSON.stringify(module.exports, null, 2));
