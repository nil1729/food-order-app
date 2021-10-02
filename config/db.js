const mongoose = require('mongoose');

exports.connectDB = async (MONGO_URI) => {
	return mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
};
