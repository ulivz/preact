const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
/**
 * @see https://web-doctor.bytedance.net/guide/quick-start/build.html#webpack-%E9%A1%B9%E7%9B%AE%E6%8E%A5%E5%85%A5
 */
const { WebDoctorWebpackPlugin } = require("@web-doctor/webpack-plugin");

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

	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		}),
		// process.env.NODE_ENV === "production" && // NODE_ENV === "production" 是因为建议在 webpack 的 mode 为 'production' 时执行插件；
		process.env.ANALYZE && // 建议在 ANALYZE 为 true 时执行分析插件，因为插件可能会拉长一些构建时间，建议本地或 CI 或 BOE 环境下执行 web doctor 分析能力；
		  new WebDoctorWebpackPlugin({
			disableClientServer: Boolean(process.env.CI_ACTOR), // 建议 CI 环境下关闭 server 能力，否则会卡住 pipeline 流程，检测 CI 环境可以使用 `process.env.CI_ACTOR`.
		  }),
	  ].filter(Boolean),
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
				use: {
					loader: 'babel-loader',
					options: {
						// presets: ["@babel/react"],
						plugins: [
							[
								'@babel/transform-react-jsx',
								{
									// @see https://babeljs.io/docs/babel-plugin-transform-react-jsx#react-automatic-runtime-1
									runtime: 'automatic',
									importSource: 'preact'
								}
							]
						]
					}
				}
			}
		]
	},

	optimization: {
		runtimeChunk: 'single'
	},
	
};
