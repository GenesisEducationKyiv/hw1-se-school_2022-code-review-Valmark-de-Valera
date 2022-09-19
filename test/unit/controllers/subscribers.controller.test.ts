import SubscribersController from '../../../src/controllers/subscribers.controller';
import ResponseMock from '../../mocks/response.mock';
import { Response } from 'express';

const response = new ResponseMock() as Response;

afterEach(() => {
	jest.restoreAllMocks();
});

describe('SubscribersController', function () {
	describe('#addSubscriber', function () {
		it('should check invalid email and return status 400', function () {
			const email = 'test';
			const spyStatus = jest.spyOn(response, 'status');

			SubscribersController.addSubscriber(email, response);

			expect(spyStatus).toHaveBeenCalled();
			expect(response.statusCode).toEqual(400);
		});
	});
	describe('#removeSubscriber', function () {
		it('should check invalid email and return status 400', function () {
			const email = 'test';
			const spyStatus = jest.spyOn(response, 'status');

			SubscribersController.removeSubscriber(email, response);

			expect(spyStatus).toHaveBeenCalled();
			expect(response.statusCode).toEqual(400);
		});
	});
	describe('#getAllSubscribers', function () {
		it('should return subscriber array', function () {
			const spySend = jest.spyOn(response, 'send');

			SubscribersController.getAllSubscribers(response);

			expect(spySend).toHaveBeenCalled();
			if (!Array.isArray(response.statusMessage))
				fail(
					`Return should be array of string values, not this: ${response.statusMessage}`
				);
			if (response.statusMessage.length && typeof response.statusMessage[0] !== 'string')
				fail(`Array should include string values, not this: ${response.statusMessage}`);
		});
	});
});
