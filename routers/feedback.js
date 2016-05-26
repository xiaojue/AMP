/*
 * feedback route
 */

import Router from 'koa-router';

const Feedback = Router();

Feedback.post('/feedback', async (ctx, next) => {
	const Feedback = global.dbHandle.getModel('feedback');
	const newFeedback = await Feedback.create({
		user: ctx.session.userinfo._id,
		feedback: ctx.body.feedback
	})
	ctx.success(newFeedback, '成功');
})

export default Feedback;
