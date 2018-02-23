module.exports = (db, collection, title, type, startDate) =>
	db
		.collection(collection)
		.doc()
		.set({
			name: title,
			type: type,
			startDate: startDate,
		});
