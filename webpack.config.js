const { webpack, ProvidePlugin } = require("webpack");
const path = require('path');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: 'master.js'
	},
	devtool: "source-map",
	mode: "development",
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules:[{
			test: /\.ts?$/,
			loader: 'babel-loader',
		}]
	},
	plugins: [
		new ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.$': 'jquery',
			'window.jQuery': 'jquery'
		})
	]
}