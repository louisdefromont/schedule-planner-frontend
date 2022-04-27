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
				use: ['style-loader', 'css-loader']
			}
		]
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	devServer: {
		static: path.join(__dirname, 'public'),
		port: 9000
	}
}