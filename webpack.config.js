/*eslint-env node */
var path = require('path');
var webpack = require('webpack');

var rules = [
  {
    test: /\.js$/,
    use: ['babel-loader'],
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    exclude: [
      /\.global\.css$/,
      /prism-?(.*)\.css$/
    ],
    use: [
      {
        loader: 'style-loader',
        options: {sourceMap: true},
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
    ],
  },
  {
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.css$/,
      /\.json$/,
      /\.bmp$/,
      /\.gif$/,
      /\.jpe?g$/,
      /\.png$/,
    ],
    loader: require.resolve('file-loader'),
    options: {
      name: 'fonts/[name].[ext]',
    },
  },
  {
    test: /\.global\.css$/,
    use: ['style-loader', 'raw-loader'],
  },
  {
    test: /prism-?(.*)\.css$/,
    use: ['style-loader', 'raw-loader'],
  },
];

module.exports = [{
  entry: './src/RichTextEditor.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'shengnian-editor.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: rules,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: true,
    //   comments: true,
    //   mangle: false,
    //   compress: {
    //     dead_code: true,
    //     warnings: false,
    //   },
    // }),
  ],
}, {
  entry: './src/demo.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'demo.js',
  },
  module: {
    rules: rules,
  },
}];
