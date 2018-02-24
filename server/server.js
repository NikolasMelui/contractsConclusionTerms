const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
// const bodyParser = require('koa-body')();
const cors = require('koa-cors');
const koaStatic = require('koa-static');

const firebaseConnector = require('./firebase/connector');
const firebaseGet = require('./firebase/getter');
// const firebaseSet = require('./firebase/setter');

const port = process.env.PORT || 3001;
const server = new Koa();
const router = new Router();

const db = firebaseConnector.firestore();

// firebaseSet(db, 'events', 'firstTweet', 'auctionShort', new Date(2018, 2, 21));

router.post('/firebaseGet', async ctx => {
	ctx.body = await firebaseGet(db, 'events');
});

server
	.use(logger('dev'))
	.use(cors())
	.use(koaStatic('public'))
	.use(router.routes())
	.listen(port);
