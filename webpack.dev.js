/**
 * @component webpack.dev.js
 * @description 开发环境配置
 * @time 2018/3/6
 * @author JOKER XU
 */
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = merge(base, {
  output: {
	filename: 'static/js/[name].js', //
	path: resolve('dist'), // 输出的文件地址
	publicPath: ''
  },
  devtool: 'inline-source-map',
  module: {
	rules: [
	  {
		test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
	  },
	  {
		test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
	  },
	]
  },
  devServer: {
	contentBase: './dist',
	compress: true,
	port: 8015,
	historyApiFallback: true,//不跳转
	inline: true//实时刷新
  },
  plugins: [
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin()
  ],
});