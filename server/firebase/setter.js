module.exports = async (db, collection, title, type, date) => {
	await db
		.collection(collection)
		.doc()
		.set({
			title,
			type,
			date,
		});
	return 'Seccuess';
};
