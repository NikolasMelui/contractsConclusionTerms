const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const cors = require('koa-cors');
const koaStatic = require('koa-static');

const firebaseConnector = require('./connectors/firebaseConnector');
const getEvents = require('./controllers/getEvents');
const pushEvent = require('./controllers/pushEvent');
const requestValidator = require('./controllers/middleware/requestValidator');
const archiveEvent = require('./controllers/archiveEvent');

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

router.post('/pushevent', requestValidator, async ctx => {
	ctx.body = await pushEvent(
		db,
		'actualEvents',
		ctx.request.body.title,
		ctx.request.body.type,
		ctx.request.body.procurementPlanDate
	);
});

router.post('/getevents', async ctx => {
	ctx.body = await getEvents(db, 'actualEvents');
});

router.post('/archiveevent/:id', async ctx => {
	ctx.body = await archiveEvent(db, 'actualEvents', 'archiveEvents', ctx.request.body.parameters.id);
});
server.listen(port);
