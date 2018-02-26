const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const cors = require('koa-cors');
const koaStatic = require('koa-static');

const firebaseConnector = require('./firebase/connector');
const firebaseGet = require('./firebase/getter');
const firebaseSet = require('./firebase/setter');
const requestValidator = require('./firebase/requestValidator');

const port = process.env.PORT || 3001;
const server = new Koa();
const router = new Router();

const db = firebaseConnector.firestore();

server
	.use(logger('dev'))
	.use(require('koa-body')())
	.use(cors())
	.use(koaStatic('public'))
	.use(router.allowedMethods())
	.use(router.routes());

router.post('/firebaseSet', requestValidator, async ctx => {
	ctx.body = await firebaseSet(
		db,
		'events',
		ctx.request.body.title,
		ctx.request.body.type,
		ctx.request.body.date,
		ctx.request.body.dateString
	);
});

router.post('/firebaseGet', async ctx => {
	ctx.body = await firebaseGet(db, 'events');
});

server.listen(port);
