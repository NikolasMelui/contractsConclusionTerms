module.exports = async (db, collection) => {
	const response = [];
	await db
		.collection(collection)
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				response.push({
					type: doc.data().type,
					title: doc.data().title,
					procurementPlanDate: doc.data().procurementPlanDate,
				});
			});
		})
		.catch(err => {
			global.console.log('Error getting documents', err);
		});
	return response;
};
