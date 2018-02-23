const firebaseMonthDefine = require('./functions/monthDefine');

module.exports = (db, collection) =>
	db
		.collection(collection)
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				/* Don't think so, but i can try...)
        */
				return (response += `
      ${doc.data().name} => ${doc.data().date.getDate()} ${firebaseMonthDefine(
					doc.data().date.getMonth()
				)} ${doc.data().date.getFullYear()} года
      `);
			});
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
