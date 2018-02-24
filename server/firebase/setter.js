module.exports = (db, collection, title, type, date) =>
	db
		.collection(collection)
		.doc()
		.set({
			title,
			type,
			date,
		});
