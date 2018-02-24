const firebaseMonthDefine = require('./functions/monthDefine');

module.exports = async (db, collection) => {
	let response = [];
	await db
		.collection(collection)
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				response.push({
					type: doc.data().type,
					title: doc.data().title,
					date: doc.data().startDate,
					dateString: `${doc.data().startDate.getDate()}  ${firebaseMonthDefine(
						doc.data().startDate.getMonth()
					)}  ${doc.data().startDate.getFullYear()} года`,
				});
			});
		})
		.catch(err => {
			global.console.log('Error getting documents', err);
		});
	return response;
};
