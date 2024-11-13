module.exports = {
  presets: ["module:@react-native/babel-preset"],
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
    ["@babel/plugin-proposal-optional-catch-binding"],
    "@babel/plugin-proposal-export-namespace-from",
    [
      "module-resolver",
      {
        "cwd": "babelrc",
        "root": ["."],
        "extensions": [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        "alias": {
          "@root": "./packages/member",
          "@app": "./packages/member/app",
          "@theme": "./packages/member/app/theme",
          "@assets": "./packages/member/assets",
          "@components": "./packages/member/components",
          "@screens": "./packages/member/app/screens",
          "@services": "./packages/member/app/services"

        }
      }
    ],
    ["react-native-reanimated/plugin", {
      globals: [
        "__scanCodes"
      ]
    }]
  ],
};
