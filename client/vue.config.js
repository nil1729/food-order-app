const path = require('path');
module.exports = {
	outputDir: path.resolve(__dirname, '../public'),
	devServer: {
		proxy: 'http://localhost:5000',
	},
	configureWebpack: {
		devtool: 'cheap-source-map'
	}
};