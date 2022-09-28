import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { SubscriberController } from '../../subscriber.controller/subscriber.controller';
import { SubscriberModule } from '../../subscriber.module';
import { RequestMock } from '../mocks/request.mock';
import { ResponseMock } from '../mocks/response.mock';

const request = new RequestMock() as Request;
const response = new ResponseMock() as Response;

describe('SubscriberController', () => {
	let controller: SubscriberController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [SubscriberModule],
		}).compile();

		controller = module.get<SubscriberController>(SubscriberController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('#getAllSubscribers', function () {
		it('should return subscriber array', function () {
			const spySend = jest.spyOn(response, 'send');

			controller.getAllSubscribers(request, response);

			expect(spySend).toHaveBeenCalled();
			if (!Array.isArray(response.statusMessage))
				fail(
					`Return should be array of string values, not this: ${response.statusMessage}`,
				);
			if (response.statusMessage.length && typeof response.statusMessage[0] !== 'string')
				fail(`Array should include string values, not this: ${response.statusMessage}`);
		});
	});
});
