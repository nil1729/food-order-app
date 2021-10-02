const server = require('../server');
const request = require('supertest')(server);

describe('Setup Testing', () => {
	test('should ', async () => {
		await request
			.get('/')
			.expect(200)
			.then((response) => {
				expect(response.headers['content-type']).toMatch(/text\/html/);
			});
	});
});
