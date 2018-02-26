const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const cors = require('koa-cors');
const koaStatic = require('koa-static');

const firebaseConnector = require('./firebase/firebaseConnector');
const actualEventsGet = require('./firebase/actualEventsGetter');
const actualEventsSet = require('./firebase/actualEventsSetter');
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

router.post('/actualeventsset', requestValidator, async ctx => {
	ctx.body = await actualEventsSet(
		db,
		'actualEvents',
		ctx.request.body.title,
		ctx.request.body.type,
		ctx.request.body.procurementPlanDate
	);
});

router.post('/actualeventsget', async ctx => {
	ctx.body = await actualEventsGet(db, 'actualEvents');
});

server.listen(port);
