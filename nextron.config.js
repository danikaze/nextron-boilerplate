const { existsSync } = require('fs');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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

    // copy the content of main/static to the /app folder (not /app/static)
    if (existsSync('main/static')) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [{ from: 'main/static/' }],
        })
      );
    }

    return config;
  },
};
