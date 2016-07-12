module.exports = {
  entry: {
    'FontMetrics': './source/FontMetrics.js',
    'demo': './source/demo/index.js',
  },
  output: {
    umdNamedDefine: true,
    libraryTarget: 'umd',
    publicPath: '/output/',
    library: '[name]',
    filename: '[name].js',
    path: './output'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/
      }
    ]
  }
}