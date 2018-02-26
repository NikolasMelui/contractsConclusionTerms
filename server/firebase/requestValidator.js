const dateStringify = require('./dateStringify');

module.exports = async (ctx, next) => {
	ctx.request.body.title = String(ctx.request.body.title);
	ctx.request.body.type = ctx.request.body.type.text;
	ctx.request.body.date = new Date(ctx.request.body.date);
	ctx.request.body.dateString = dateStringify(ctx.request.body.date);

	await next();
};
