const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const static = require('koa-static');
const firebaseConnector = require('./firebase/connector');

const port = process.env.PORT || 3001;
const server = new Koa();
const router = new Router();

const mainRouter = require('./routers/main.router');

const db = firebaseConnector.firestore();

let docRef = db.collection('users').doc('nikolasmelui');

var setAda = docRef.set({
	firstName: 'Nikolas',
	lastName: 'Melui',
	born: 1991,
});

server
	.use(logger('dev'))
	.use(static('public'))
	.use(router.routes())
	.listen(port);
