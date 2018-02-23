const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const static = require('koa-static');
const firebaseConnector = require('./firebase/connector');

const port = process.env.PORT || 3001;
const server = new Koa();
const router = new Router();

const db = firebaseConnector.firestore();

db
	.collection('events')
	.doc('eventOne')
	.set({
		name: 'newEventOne',
		date: new Date(2018, 2, 21),
	});

let response = '';

const monthDefine = monthDig => {
	const russianMonths = {
		0: 'января',
		1: 'февраля',
		2: 'марта',
		3: 'апреля',
		4: 'мая',
		5: 'июня',
		6: 'июля',
		7: 'августа',
		8: 'сентября',
		9: 'октября',
		10: 'ноября',
		11: 'декабря',
	};
	for (let [key, value] of Object.entries(russianMonths)) {
		if (key == monthDig) return value;
	}
};

db
	.collection('events')
	.get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			response += `
      ${doc.data().name} => ${doc.data().date.getDate()} ${monthDefine(
				doc.data().date.getMonth()
			)} ${doc.data().date.getFullYear()} года
      `;
		});
	})
	.catch(err => {
		console.log('Error getting documents', err);
	});

router.get('/', ctx => {
	ctx.body = response;
});

server
	.use(logger('dev'))
	.use(static('public'))
	.use(router.routes())
	.listen(port);
