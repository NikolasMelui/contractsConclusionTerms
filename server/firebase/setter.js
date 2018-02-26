module.exports = async (db, collection, title, type, date, dateString) => {
	await db
		.collection(collection)
		.doc()
		.set({
			title,
			type,
			date,
			dateString,
		});
	return 'Success';
};
