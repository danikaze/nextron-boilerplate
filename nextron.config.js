const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({ configFile: './main/tsconfig.json' })
    );

    return config;
  },
};
