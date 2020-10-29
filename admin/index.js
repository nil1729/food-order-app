const { program } = require('commander');
const { prompt, questions } = require('./question');
const firebaseAdmin = require('../config/admin');
const photoURL =
	'https://www.logolynx.com/images/logolynx/23/23938578fb8d88c02bc59906d12230f3.png';
const adminClaim = {
	siteAdmin: true,
};

const main = async () => {
	program.version('1.0.0').description('VueJS Phone Buying Store');
	program
		.command('add')
		.alias('a')
		.action(async () => {
			const { email, displayName, phoneNumber, password } = await prompt(
				questions
			);
			console.log('\n\nNew Admin is Creating ....\n');
			try {
				let newAdmin = await firebaseAdmin
					.auth()
					.createUser({ email, password, displayName, photoURL });
				await firebaseAdmin
					.auth()
					.setCustomUserClaims(newAdmin.uid, adminClaim);
				await firebaseAdmin
					.firestore()
					.collection('users')
					.doc(newAdmin.uid)
					.set({
						cart: [],
						details: {
							id: newAdmin.uid,
							...newAdmin.providerData[0],
							phoneNumber: phoneNumber,
						},
					});
				console.log('Admin Created');
			} catch (e) {
				console.log(e);
			}
			process.exit(1);
		});
	program.parseAsync(process.argv);
};

main();
