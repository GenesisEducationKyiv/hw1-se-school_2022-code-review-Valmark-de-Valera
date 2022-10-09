import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { RequestMock } from '../mocks/request.mock';
import { ResponseMock } from '../mocks/response.mock';
import { UserController } from '../../user.controller/user.controller';
import { UserModule } from '../../user.module';

const request = new RequestMock() as Request;
const response = new ResponseMock() as Response;

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('#getAllUsers', function () {
		it('should return subscriber array', function () {
			const spySend = jest.spyOn(response, 'send');

			controller.getAllUsers(request, response);

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
