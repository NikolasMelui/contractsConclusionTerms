const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const static = require('koa-static');
const firebaseConnector = require('./firebase/connector');
const getFullYear = require('./firebase/addons/monthsDefiner');

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
