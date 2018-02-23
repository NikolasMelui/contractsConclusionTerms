const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const static = require('koa-static');

const port = process.env.PORT || 3001;
const server = new Koa();
const router = new Router();

router.get('/', ctx => (ctx.body = 'Working'));

server
	.use(logger('dev'))
	.use(static('public'))
	.use(router('routes'))
	.listen(port);
