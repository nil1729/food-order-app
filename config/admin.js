const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const secretFilePath = path.join('/opt/nil1729/food-order-app/secret.json');
const fileContent = fs.readFileSync(secretFilePath).toString();
const serviceAccount = JSON.parse(fileContent);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://food-order-app-nil.firebaseio.com',
});

module.exports = admin;
