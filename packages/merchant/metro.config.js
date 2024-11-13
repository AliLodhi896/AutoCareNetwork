const { getDefaultConfig } = require("metro-config")
const path = require("path")
const extraNodeModules = {
  'shared': path.resolve(__dirname + '/../shared'),
  'assets': path.resolve(__dirname + '/../assets')
}
const watchFolders = [
  path.resolve(__dirname + '/../shared'),
  path.resolve(__dirname + '/../assets')
]
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig()
  return {
    projectRoot: path.resolve(__dirname, "./"),
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
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
    // watchFolders
  }
})()
