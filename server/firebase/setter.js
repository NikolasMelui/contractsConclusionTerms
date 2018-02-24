module.exports = (db, collection, title, type, startDate) =>
	db
		.collection(collection)
		.doc()
		.set({
			title,
			type,
			startDate,
		});
