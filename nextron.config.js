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

    configureBabelLoader(config);

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

/*
 * If this issue gets fixed:
 *   https://github.com/saltyshiomix/nextron/issues/97
 * this function won't be needed anymore.
 *
 * Also:
 *   npm remove @babel/plugin-proposal-optional-chaining
 */
function configureBabelLoader(config) {
  const rule = config.module.rules.find(
    (rule) =>
      (Array.isArray(rule.use) &&
        rule.use.filter((use) => use && /babel-loader/.test(use.loader))
          .length > 0) ||
      (typeof rule.use === 'object' && /babel-loader/.test(rule.use.loader))
  );

  if (!rule.use.options.plugins) {
    rule.use.options.plugins = [];
  }
  rule.use.options.plugins.push(
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining'
  );

  return rule;
}
