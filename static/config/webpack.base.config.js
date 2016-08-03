import path from 'path';

import baseConfig from './base.config.js';

import CopyWebpackPlugin from 'copy-webpack-plugin';

const rootPath = path.join(__dirname, '../../');

export default {
	entry: {
		app: path.join(__dirname, '../src/js/app.js')
	},
	output: {
		path: baseConfig.build.staticRoot,
		publicPath: baseConfig.build.staticPublicPath,
		filename: '[name].js'
	},
	module: {
		preLoaders: [{
			test: /\.vue$/,
			loader: 'eslint',
			include: path.join(rootPath, 'static/src/'),
			exclude: path.join(rootPath, 'node_modules/')
		}, {
			test: /\.js$/,
			loader: 'eslint',
			include: path.join(rootPath, './static/src/'),
			exclude: path.join(rootPath, './node_modules/')
		}],
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			query: { compact: false },
			include: path.join(rootPath, './static/src/'),
			exclude: path.join(rootPath, './node_modules/')
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'dist/img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'dist/fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		alias: {
			utils: path.join(rootPath, './static/src/js/util'),
			store: path.join(rootPath, './static/src/js/store'),
			actions: path.join(rootPath, './static/src/js/store/actions'),
			wangeditor: path.join(rootPath, './static/src/js/lib/wangeditor.js')
		}
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: path.join(rootPath, './static/src/img/main_bg.png'),
			to: path.join(rootPath, './static/dist/img/')
		}, {
			from: path.join(rootPath, './static/src/img/main_bg2.jpg'),
			to: path.join(rootPath, './static/dist/img/')
		}, {
			from: path.join(rootPath, './static/src/img/main_bg3.jpg'),
			to: path.join(rootPath, './static/dist/img/')
		}, {
			from: path.join(rootPath, './static/src/img/user_avatar.png'),
			to: path.join(rootPath, './static/dist/img/')
		}])
	]
};
