module.exports = async (db, collection, title, type, procurementPlanDate) => {
	await db
		.collection(collection)
		.doc()
		.set({
			title,
			type,
			procurementPlanDate,
		});
	return 'Success';
};
