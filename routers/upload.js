/*
 * upload file remote
 */

import Router from 'koa-router';

import fs from 'fs';
import Path from 'path';

const Upload = Router({
	prefix: '/upload'
});

Upload.post('/:type', async (ctx, next) => {

	const type = ctx.params.type;

	const User = global.dbHandle.getModel('users');
	const userId = ctx.session.userinfo._id;

	const file = ctx.body.files.files;
	const readFrom = fs.createReadStream(file.path);
	const fileName = Path.basename(file.path);
	const extName = Path.extname(file.name);
	var saveTo = fs.createWriteStream(Path.join(global.pwd, './upload/' + fileName + extName));
	readFrom.pipe(saveTo);

	const updateobj = {};
	updateobj[type] = fileName + extName;

	const updateModel = await User.update({
	    '_id': userId
	}, {
	    '$set': updateobj
	})

	ctx.session.userinfo[type] = fileName + extName;

	saveTo.on('finish', function() {
	    fs.unlinkSync(file.path);
	});

	ctx.success({
		file: fileName + extName
	}, '修改成功');
})

export default Upload;
