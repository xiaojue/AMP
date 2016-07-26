import path from 'path';

const pwd = __dirname;

export default {
	build: {
		viewFile: path.join(pwd, '../../views/index.html'),
		viewFolder: path.join(pwd, '../../views'),
		staticRoot: path.join(pwd, '../'),
		staticPublicPath: '/'
	}
};
