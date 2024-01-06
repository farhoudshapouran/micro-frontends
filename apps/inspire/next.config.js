const NextFederationPlugin = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
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
        name: "inspire",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./latest-products": "./components/latest-products",
          "./related-products": "./components/related-products",
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
