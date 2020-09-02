const { join } = require('path');

module.exports = {
  webpack: (config) => {
    // add extra paths to be processed by the existing babel loader
    const babelFolders = [join(__dirname, '..', 'common-utils')];
    addToBabel(config, babelFolders);

    return Object.assign(config, {
      target: 'electron-renderer',
    });
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
