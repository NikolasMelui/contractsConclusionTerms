const admin = require('firebase-admin');

const serviceAccount = require('../config.json').firebase;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://koa-firebase-test.firebaseio.com',
});

module.exports = admin;
