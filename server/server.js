const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const static = require('koa-static');

const firebaseConnector = require('./firebase/connector');
const firebaseGet = require('./firebase/getter');
const firebaseSet = require('./firebase/setter');

const port = process.env.PORT || 3001;
const server = new Koa();
const router = new Router();

const db = firebaseConnector.firestore();

firebaseSet(db, 'events', 'firstTweet', 'auction:short', new Date(2018, 2, 21));
const response = firebaseGet(db, 'events');
router.get('/', ctx => {
	ctx.body = nse;
});

server
	.use(logger('dev'))
	.use(static('public'))
	.use(router.routes())
	.listen(port);
