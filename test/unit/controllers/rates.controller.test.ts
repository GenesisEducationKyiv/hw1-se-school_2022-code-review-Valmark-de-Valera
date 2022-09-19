import ResponseMock from '../../mocks/response.mock';
import RatesController from '../../../src/controllers/rates.controller';
import { Response } from 'express';
import {
	providersKeysDict,
	providersNamesDict,
} from '../../../src/services/rates/const/providers.const';
import 'dotenv/config';

const response = new ResponseMock() as Response;

afterEach(() => {
	jest.restoreAllMocks();
});

describe('RatesController', function () {
	describe('#changeProviderByName', function () {
		it('should return 404 status code', function () {
			const providerName = '';
			const spyStatus = jest.spyOn(response, 'status');

			RatesController.changeProviderByName(providerName, response);

			expect(spyStatus).toHaveBeenCalled();
			expect(response.statusCode).toEqual(404);
		});
		it('should set active (from .env file) provider and confirm it', function () {
			const providerKey = process.env.CRYPTO_CURRENCY_PROVIDER;
			const providerDictKey = Object.keys(providersKeysDict).find(
				(key: string) =>
					providersKeysDict[key as keyof typeof providersKeysDict] === providerKey
			);
			const providerName =
				providersNamesDict[providerDictKey as keyof typeof providersNamesDict];
			const spySend = jest.spyOn(response, 'send');

			RatesController.changeProviderByName(providerName, response);

			expect(spySend).toHaveBeenCalled();
			expect(response.statusMessage).toBeTruthy();
		});
	});
});
