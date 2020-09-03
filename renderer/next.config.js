const { join } = require('path');
const { getBuildTimeConstantsPlugins } = require('../build-time-constants');

module.exports = {
  webpack: (config, { buildId, dev, isServer, webpack }) => {
    config.target = 'electron-renderer';

    // add extra paths to be processed by the existing babel loader
    const babelFolders = [join(__dirname, '..', 'common-utils')];
    addToBabel(config, babelFolders);

    // add build-time defined constants
    config.plugins.push(
      ...getBuildTimeConstantsPlugins(
        `renderer-${isServer ? 'server' : 'client'}`,
        { buildId, dev, isServer, webpack }
      )
    );

    return config;
  },
};

function addToBabel(config, paths) {
  const rule = config.module.rules.find(
    (rule) =>
      (Array.isArray(rule.use) &&
        rule.use.filter((use) => use && /babel-loader/.test(use.loader))
          .length > 0) ||
      (typeof rule.use === 'object' && /babel-loader/.test(rule.use.loader))
  );

  if (rule) {
    rule.include.push(...paths);
  }
}
