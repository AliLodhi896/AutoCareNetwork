module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "module-resolver",
      {
        cwd: "babelrc",
        root: ["."],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
    [
      "react-native-reanimated/plugin",
      {
        globals: ["__decode"],
      },
    ],
  ],
};
