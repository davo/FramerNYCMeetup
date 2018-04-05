var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: {
		app: './main.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[hash].js'
	},
	externals: {
		reveal: 'Reveal'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
			{ test: /\.(eot|svg|ttf|woff|woff2)$/, loaders: ['file-loader'] },
			{
				test: /\.(jpe?g|png|gif|svg|mp4)$/i,
				use: 'file-loader'
			},
			{
			    test: /\.(ogg|mp3|wav|mpe?g)$/i,
			    use: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		})
	],
	devServer: {
		noInfo: true,
		port: 8081
	}
}
