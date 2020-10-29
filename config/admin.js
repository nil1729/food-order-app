const admin = require('firebase-admin');
const serviceAccount = require('./secret.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://vue-phone-store.firebaseio.com',
});

module.exports = admin;
