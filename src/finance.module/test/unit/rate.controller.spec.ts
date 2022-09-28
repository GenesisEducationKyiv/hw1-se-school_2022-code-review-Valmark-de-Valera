import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { RateController } from '../../rate.controller/rate.controller';
import { ResponseMock } from '../mocks/response.mock';
import { RequestMock } from '../mocks/request.mock';
import { providersKeysDict, providersNamesDict } from '../../finance.service/const/providers.const';
import { FinanceModule } from '../../finance.module';

const request = new RequestMock() as Request;
const response = new ResponseMock() as Response;

describe('RateController', () => {
	let controller: RateController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [FinanceModule],
		}).compile();

		controller = module.get<RateController>(RateController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('#changeProviderByName', function () {
		it('should return 404 status code', function () {
			const providerName = '';
			const spyStatus = jest.spyOn(response, 'status');

			controller.changeProviderByName(request, response, providerName);

			expect(spyStatus).toHaveBeenCalled();
			expect(response.statusCode).toEqual(404);
		});
		it('should set active (from .env file) provider and confirm it', function () {
			const providerKey = process.env.CRYPTO_CURRENCY_PROVIDER;
			const providerDictKey = Object.keys(providersKeysDict).find(
				(key: string) =>
					providersKeysDict[key as keyof typeof providersKeysDict] === providerKey,
			);
			const providerName =
				providersNamesDict[providerDictKey as keyof typeof providersNamesDict];
			const spySend = jest.spyOn(response, 'send');

			controller.changeProviderByName(request, response, providerName);

			expect(spySend).toHaveBeenCalled();
			expect(response.statusMessage).toBeTruthy();
		});
	});
});
