import 'reflect-metadata';
import SubscribersController from '../../../src/controllers/subscribers.controller';
import ResponseMock from '../../mocks/response.mock';
import { Request, Response } from 'express';
import { cleanUpMetadata } from 'inversify-express-utils';
import RequestMock from '../../mocks/request.mock';
import { container } from '../../../src/inversify.config';
import { DIServices } from '../../../src/DITypes';
import SubscribersService from '../../../src/services/subscriber/subscriber-service';

const request = new RequestMock() as Request;
const response = new ResponseMock() as Response;

beforeEach((done) => {
	cleanUpMetadata();
	done();
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe('SubscribersController', function () {
	describe('#addSubscriber', function () {
		it('should check invalid email and return status 400', function () {
			request.body.email = 'test';
			const spyStatus = jest.spyOn(response, 'status');
			const subscribersService: SubscribersService = container.get(
				DIServices.SubscribersService
			);
			const subscriberController = new SubscribersController(subscribersService);

			subscriberController.addSubscriber(request, response);

			expect(spyStatus).toHaveBeenCalled();
			expect(response.statusCode).toEqual(400);
		});
	});
	describe('#removeSubscriber', function () {
		it('should check invalid email and return status 400', function () {
			request.body.email = 'test';
			const spyStatus = jest.spyOn(response, 'status');
			const subscribersService: SubscribersService = container.get(
				DIServices.SubscribersService
			);
			const subscriberController = new SubscribersController(subscribersService);

			subscriberController.removeSubscriber(request, response);

			expect(spyStatus).toHaveBeenCalled();
			expect(response.statusCode).toEqual(400);
		});
	});
	describe('#getAllSubscribers', function () {
		it('should return subscriber array', function () {
			const subscribersService: SubscribersService = container.get(
				DIServices.SubscribersService
			);
			const subscriberController = new SubscribersController(subscribersService);
			const spySend = jest.spyOn(response, 'send');

			subscriberController.getAllSubscribers(request, response);

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
