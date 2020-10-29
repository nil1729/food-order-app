const admin = require('../config/admin');

module.exports = async (req, res, next) => {
	try {
		if (!req.headers['x-auth-token']) {
			return res.status(403).json({
				msg: 'Unauthorized Access',
			});
		}
		const token = req.headers['x-auth-token'];
		const decodedToken = await admin.auth().verifyIdToken(token);
		req.authID = decodedToken.uid;
		req.token = decodedToken;
		req.siteAdmin = decodedToken.siteAdmin || false;
		next();
	} catch (e) {
		return res.status(403).json({
			msg: 'Invalid Credentials',
		});
	}
};
