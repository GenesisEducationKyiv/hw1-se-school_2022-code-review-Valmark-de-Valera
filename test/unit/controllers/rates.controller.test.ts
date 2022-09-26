import 'reflect-metadata';
import ResponseMock from '../../mocks/response.mock';
import RequestMock from '../../mocks/request.mock';
import RatesController from '../../../src/controllers/rates.controller';
import { Request, Response } from 'express';
import {
	providersKeysDict,
	providersNamesDict,
} from '../../../src/services/rates/const/providers.const';
import 'dotenv/config';
import FinanceService from '../../../src/services/rates/finance-service';
import { container } from '../../../src/inversify.config';
import { DIServices } from '../../../src/DITypes';
import { cleanUpMetadata } from 'inversify-express-utils';

const request = new RequestMock() as Request;
const response = new ResponseMock() as Response;

beforeEach((done) => {
	cleanUpMetadata();
	done();
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe('RatesController', function () {
	describe('#changeProviderByName', function () {
		it('should return 404 status code', function () {
			const spyStatus = jest.spyOn(response, 'status');
			const financeService: FinanceService = container.get(DIServices.FinanceService);
			const rateController = new RatesController(financeService);

			rateController.changeProviderByName(request, response);

			expect(spyStatus).toHaveBeenCalled();
			expect(response.statusCode).toEqual(404);
		});
		it('should set active (from .env file) provider and confirm it', function () {
			const providerKey = process.env.CRYPTO_CURRENCY_PROVIDER;
			const financeService: FinanceService = container.get(DIServices.FinanceService);
			const rateController = new RatesController(financeService);
			const providerDictKey = Object.keys(providersKeysDict).find(
				(key: string) =>
					providersKeysDict[key as keyof typeof providersKeysDict] === providerKey
			);
			const providerName =
				providersNamesDict[providerDictKey as keyof typeof providersNamesDict];
			request.body.name = providerName;
			const spySend = jest.spyOn(response, 'send');

			rateController.changeProviderByName(request, response);

			expect(spySend).toHaveBeenCalled();
			expect(response.statusMessage).toBeTruthy();
		});
	});
});
