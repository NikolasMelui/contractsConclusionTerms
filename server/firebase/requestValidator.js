module.exports = async (ctx, next) => {
	ctx.request.body.title = String(ctx.request.body.title);
	ctx.request.body.type = ctx.request.body.type.text;
	ctx.request.body.procurementPlanDate = new Date(ctx.request.body.procurementPlanDate);

	await next();
};
