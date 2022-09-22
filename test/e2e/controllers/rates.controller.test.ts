import request from 'supertest';
import app from '../../../src/app';

describe('RatesController', function () {
	describe('#changeProviderByName', function () {
		it('should return rate and 200 code', function (done) {
			request(app)
				.get('/api/rate')
				.expect(200)
				.expect((response) => {
					expect(typeof parseInt(response.body) === 'number').toBeTruthy();
				})
				.end(done);
		});
	});
});
