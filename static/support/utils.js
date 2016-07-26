import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { exec } from 'child_process';

export const cssExtractLoaders = (options) => {
	options = options || {};

	function generateLoaders(loaders) {
		let sourceLoader = loaders.map((loader) => {
			let extraParamChar;
			if (/\?/.test(loader)) {
				loader = loader.replace(/\?/, '-loader?');
				extraParamChar = '&';
			} else {
				loader = loader + '-loader';
				extraParamChar = '?';
			}
			return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
		}).join('!');

		if (options.extract) {
			return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
		} else {
			return ['vue-style-loader', sourceLoader].join('!');
		}
	}

	return {
		css: generateLoaders(['css']),
		postcss: generateLoaders(['css']),
		less: generateLoaders(['css', 'less']),
		sass: generateLoaders(['css', 'sass?indentedSyntax']),
		scss: generateLoaders(['css', 'sass']),
		stylus: generateLoaders(['css', 'stylus']),
		styl: generateLoaders(['css', 'stylus'])
	};
};

export const vueCssLoaders = () => {
	const join = (array) => {
		let loaders = ['vue-style', ...array];
		return loaders.join('!');
	};

	return {
		css: join(['css']),
		postcss: join(['css']),
		less: join(['css', 'less']),
		sass: join(['css', 'sass?indentedSyntax']),
		scss: join(['css', 'sass']),
		stylus: join(['css', 'stylus']),
		styl: join(['css', 'stylus'])
	};
};

export const openUrl = (url) => {
	const execStr = process.platform === 'win32' ? 'start' : 'open';
	exec(`${execStr} ${url}`);
};
