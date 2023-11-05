const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
	entry: {
		index: './src/index.jsx'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: isProd ? '[name].[chunkhash:5].js' : '[name].js',
		chunkFilename: '[name].chunk.[chunkhash:5].js'
	},

	devServer: {
		static: './dist'
	},
	resolve: {
		alias: {
			'preact/devtools': path.resolve(__dirname, '../devtools/src/index.js'),
			'preact/debug': path.resolve(__dirname, '../debug/src/index.js'),
			'preact/jsx-dev-runtime': path.resolve(__dirname, '../jsx-runtime/src/index.js'),
			'preact/jsx-runtime': path.resolve(__dirname, '../jsx-runtime/src/index.js'),
			'preact': path.resolve(__dirname, '../src/index.js'),
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{ loader: 'style-loader', options: { injectType: 'styleTag' } },
					{
						loader: 'css-loader',
						options: { sourceMap: true, importLoaders: 1, modules: false }
					}
				]
			},

			{
				test: /\.svg$/,
				type: 'asset'
			},

			
			{
				test: /.jsx?$/,
				exclude: /node_modules/,
				use: [
				  {
					loader: "babel-loader",
					options: {
					  // presets: ["@babel/react"],
					  plugins: [
						[
						  "@babel/transform-react-jsx",
						  {
							// @see https://babeljs.io/docs/babel-plugin-transform-react-jsx#react-automatic-runtime-1
							runtime: "automatic",
							importSource: "preact",
						  },
						],
					  ],
					},
				  },
				],
			  },
		
		]
	},

	optimization: {
		runtimeChunk: 'single'
	},

};
