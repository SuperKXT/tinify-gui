const rules = require('./webpack.rules'); // eslint-disable-line @typescript-eslint/no-var-requires
const plugins = require('./webpack.plugins'); // eslint-disable-line @typescript-eslint/no-var-requires

rules.push({
	test: /\.css$/,
	use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
	module: {
		rules,
	},
	plugins: plugins,
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
	},
	devtool: 'source-map',
};