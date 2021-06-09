const { merge } = require('webpack-merge');
const path = require('path');

const makeCommonConfig = (ifdefOpts) => {
  return {
    context: path.resolve(__dirname, '../src'),
    output: {
      path: path.resolve(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            },
            {
              loader: "ifdef-loader",
              options: ifdefOpts
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    }
  };
};

module.exports = (ifdefOpts) => ({
  main: merge(makeCommonConfig(ifdefOpts), {
    entry: './main/index.ts',
    output: { filename: 'main.bundle.js'},
    target: 'electron-main'
  }),
  renderer: merge(makeCommonConfig(ifdefOpts), {
    entry: './render/index.tsx',
    output: { filename: 'render.bundle.js'},
    target: 'web' // electron-renderer
  })
});
