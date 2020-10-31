module.exports = model => {
	return async (req, res, next) => {
		const len = await model.countDocuments({category: {$not: /Combos/}}).exec();
		const page = parseInt(req.query.page);
		const pageLen = 8;
		const pageNo = Math.ceil(len / pageLen);
		let products = {};
		products.length = pageNo;
		products.current = page;
		const startIndex = (page - 1) * pageLen;
		const endIndex = page * pageLen;
		if (page > 1) {
			products.prev = page - 1;
		}
		try {
			if (endIndex < len) {
				products.next = page + 1;
			}
			products.results = await model
				.find({category: {$not: /Combos/ }}, {description: 0, reviews: 0})
				.sort({ createdAt: -1 })
				.limit(pageLen)
				.skip(startIndex)
				.exec();
			req.paginatedResults = products;
		} catch (e) {
			res.status(500).json({
				message: e,
			});
		}
		next();
	};
};
