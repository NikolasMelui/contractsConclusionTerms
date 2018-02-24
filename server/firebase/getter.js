const firebaseMonthDefine = require('./functions/monthDefine');
module.exports = (db, collection) => {
	let response = '';
	db
		.collection(collection)
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				response += `
      ${doc.data().name} => ${doc.data().date.getDate()} ${firebaseMonthDefine(
					doc.data().date.getMonth()
				)} ${doc.data().date.getFullYear()} года
			`;
			});
			return response;
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
};
