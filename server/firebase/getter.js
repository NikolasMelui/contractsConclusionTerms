const firebaseMonthDefine = require('./functions/monthDefine');

module.exports = async (db, collection) => {
	let response = '';
	await db
		.collection(collection)
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				response += `${doc.data().type}\n${
					doc.data().title
				} => ${doc.data().startDate.getDate()} ${firebaseMonthDefine(
					doc.data().startDate.getMonth()
				)} ${doc.data().startDate.getFullYear()} года\n\n`;
			});
		})
		.catch(err => {
			global.console.log('Error getting documents', err);
		});
	return response;
};
