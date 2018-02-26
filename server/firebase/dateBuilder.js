const dateStringify = require('./dateStringify');

module.exports = async (ctx, next) => {
	let procurementPlanDate,
		shedulePlanDate,
		noticeDate,
		endAddOfApplicationDate,
		firstPartsConsiderationDate,
		auctionDate,
		finalProtocolDate,
		contractDate;

	ctx.request.body.procurementPlanDate = procurementPlanDate;
	ctx.request.body.shedulePlanDate = shedulePlanDate;
	ctx.request.body.noticeDate = noticeDate;
	ctx.request.body.endAddOfApplicationDate = endAddOfApplicationDate;
	ctx.request.body.firstPartsConsiderationDate = firstPartsConsiderationDate;
	ctx.request.body.auctionDate = auctionDate;
	ctx.request.body.finalProtocolDate = finalProtocolDate;
	ctx.request.body.contractDate = contractDate;

	await next();
};
