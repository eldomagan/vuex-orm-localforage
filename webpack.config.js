const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  externals: [nodeExternals({
    whitelist: ['deepmerge', 'localforage', /@babel\/runtime/, 'regenerator-runtime'],
  })],
  output: {
    library: 'VuexORMLocalForage',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'vuex-orm-localforage.js',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
