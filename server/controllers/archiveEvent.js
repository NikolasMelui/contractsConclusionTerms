module.exports = async (db, actualCollection, archiveCollection, id) => {
	await db
		.collection(actualCollection)
		.doc(id)
		.delete();

	return 'Remove uccess';
};
