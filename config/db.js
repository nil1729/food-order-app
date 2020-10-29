const mongoose = require('mongoose');

module.exports = async () => {
	try {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('MongoDB Connected Successfully ...');
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};
