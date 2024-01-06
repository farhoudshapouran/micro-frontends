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
        name: "checkout",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./checkout": "./pages/checkout",
          "./add-to-cart": "./components/add-to-cart",
          "./cart-menu": "./components/cart-menu",
          "./pages-map": "./pages-map.js",
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
