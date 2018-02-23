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
		date: new Date(12, 2, 21),
	});

let response = '';

db
	.collection('events')
	.get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			response += `
      ${doc.data().name}\n
      ${doc.data().date}
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
