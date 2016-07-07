module.exports = {
  entry: './src/app.jsx',
  output: {
    filename: 'bundle.js',
    path: './public/js/',
    publicPath: './public'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        exclude: /node_modules/
      }
    ]
  }
};
