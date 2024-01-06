const NextFederationPlugin = require("@module-federation/nextjs-mf");
const { withContentlayer } = require("next-contentlayer");

const PRODUCT_APP_URL =
  process.env.NEXT_PUBLIC_PRODUCT_APP_URL || "http://localhost:3001";

const CHECKOUT_APP_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_APP_URL || "http://localhost:3002";

const INSPIRE_APP_URL =
  process.env.NEXT_PUBLIC_INSPIRE_APP_URL || "http://localhost:3003";

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    product: `product@${PRODUCT_APP_URL}/_next/static/${location}/remoteEntry.js`,
    checkout: `checkout@${CHECKOUT_APP_URL}/_next/static/${location}/remoteEntry.js`,
    inspire: `inspire@${INSPIRE_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
  transpilePackages: ["@repo/data-context", "@repo/ui", "@repo/utils"],
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: remotes(isServer),
        filename: "static/chunks/remoteEntry.js",
        exposes: {},
      })
    );

    return config;
  },
};

module.exports = withContentlayer(nextConfig);
