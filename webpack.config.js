const path = require('path');

module.exports = {
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, 'src')]
			},
			{
				test: /\.css$/,
				use: 'css-loader'
			}
		]
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist')
		},
		port: 3000
	}
}