const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    library: 'VuexORMLocalForage',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  externals: ['@vuex-orm/core'],
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
