const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const path = require("path");
const extraNodeModules = {
  'shared': path.resolve(__dirname + '/../shared'),
  'assets': path.resolve(__dirname + '/../assets')
}

const watchFolders = [
  path.resolve(__dirname + '/../shared'),
  path.resolve(__dirname + '/../assets')
]

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: path.resolve(__dirname, "./"),
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer/react-native"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders
};

module.exports = mergeConfig(defaultConfig, config);
