const firebaseMonthDefine = require('./functions/monthDefine');

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
					date: doc.data().date,
					dateString: `${doc.data().date.getDate()} ${firebaseMonthDefine(
						doc.data().date.getMonth()
					)} ${doc.data().date.getFullYear()} года`,
				});
			});
		})
		.catch(err => {
			global.console.log('Error getting documents', err);
		});
	return response;
};
