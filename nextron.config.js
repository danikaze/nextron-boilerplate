const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { getBuildTimeConstantsPlugins } = require('./build-time-constants');

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

    // add build-time defined constants
    config.plugins.push(...getBuildTimeConstantsPlugins('main', { webpack }));

    return config;
  },
};
