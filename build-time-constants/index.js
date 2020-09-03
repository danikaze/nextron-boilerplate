/*
 * Don't touch this file.
 * This is used internally by the webpack configurations
 */
const { join } = require('path');
const { existsSync } = require('fs');
const packageJson = require('../package.json');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = { getBuildTimeConstantsPlugins };

function getBuildTimeConstantsPlugins(type, buildData) {
  const constants = getConstants(type, buildData);

  const plugins = [
    gitRevisionPlugin,
    new buildData.webpack.DefinePlugin(constants),
  ];

  if (!isRenderer(type)) {
    plugins.push(
      new CleanWebpackPlugin({
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns: ['VERSION', 'COMMITHASH'],
        cleanOnceBeforeBuildPatterns: constants.IS_PRODUCTION ? [] : ['**/*'],
      })
    );
  }

  return plugins;
}

function getConstants(type, { buildId, dev, isServer }) {
  const constants = getFiles(type).reduce((res, filePath) => {
    const fileData = require(filePath);
    return { ...res, ...fileData };
  }, {});

  if (buildId) constants.BUILD_ID = buildId;
  if (isServer !== undefined) {
    constants.IS_SERVER = isServer;
  }
  constants.IS_PRODUCTION =
    dev !== undefined ? !dev : process.env.NODE_ENV === 'production';

  return stringify({
    ...constants,
    PACKAGE_NAME: packageJson.name,
    PACKAGE_VERSION: packageJson.version,
    COMMIT_HASH: gitRevisionPlugin.commithash(),
    COMMIT_HASH_SHORT: gitRevisionPlugin.commithash().substr(0, 7),
  });
}

function stringify(data) {
  return Object.entries(data).reduce((res, [key, value]) => {
    res[key] = JSON.stringify(value);
    return res;
  }, {});
}

function getFiles(type) {
  const files = ['global', 'global-secret'];

  if (isRenderer(type)) {
    files.push('renderer.js', 'renderer-secret.js');
  }

  files.push(type, `${type}-secret`);

  return files
    .map((file) => join(__dirname, `${file}.js`))
    .filter((file) => existsSync(file));
}

function isRenderer(type) {
  return /renderer/.test(type);
}
