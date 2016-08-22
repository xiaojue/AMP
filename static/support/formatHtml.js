import beautify from 'js-beautify';

const htmlBeautify = beautify.html;

const FormatHtmlPlugin = () => {};

FormatHtmlPlugin.prototype.apply = (compiler) => {
	compiler.plugin('compilation', (compilation) => {
		compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) => {
			htmlPluginData.html = htmlBeautify(htmlPluginData.html, {
				'allowed_file_extensions': ['htm', 'html', 'xhtml', 'shtml', 'xml', 'svg', 'vue'],
				'brace_style': 'collapse',
				'end_with_newline': false,
				'indent_char': ' ',
				'indent_handlebars': false,
				'indent_inner_html': false,
				'indent_with_tabs': true,
				'indent_scripts': 'keep',
				'indent_size': 4,
				'max_preserve_newlines': 0,
				'preserve_newlines': true,
				'unformatted': ['a', 'span', 'img', 'code', 'pre', 'sub', 'sup', 'em', 'strong', 'b', 'i', 'u', 'strike', 'big', 'small', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
				'wrap_line_length': 0
			});
			callback(null, htmlPluginData);
		});
	});
};

export default FormatHtmlPlugin;
