/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../../user.service/repository/interfaces/interface.user.repository';
import { UserModule } from '../../user.module';
import { FileUserRepository } from '../../user.service/repository/file.user.repository';
import { User } from '../../models/user.model';
const fileModel = require('../../../../data/user.db.json');

interface FileUserModel {
	email: string;
}

describe('UserRepository', () => {
	let repository: IUserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
		}).compile();

		repository = module.get<IUserRepository>(FileUserRepository);
	});

	it('should be defined', () => {
		expect(repository).toBeDefined();
	});

	describe('#append', function () {
		const fileName = '.tmpTestAdd.json';
		beforeAll(function () {
			try {
				fs.writeFileSync(fileName, JSON.stringify(fileModel, null, 2));
			} catch (e) {
				if (e) fail(`Failed to create temporary file: ${fileName}`);
			}
		});
		it('should create temp file and add new subscriber email', function () {
			const email = 'test@test.com';
			const user = new User(email);
			const userRepository = new FileUserRepository();
			userRepository.setDatabaseFile(fileName);

			userRepository.append(user);
			const result = require('../../../../' + fileName);

			expect(result.users.some((item: FileUserModel) => item.email === email)).toBeTruthy();
		});
		afterAll(function (callback) {
			fs.unlink(fileName, callback);
		});
	});

	describe('#remove', function () {
		const fileName = '.tmpTestRemove.json';
		const emailToRemove = 'test@test.com';
		beforeAll(function () {
			try {
				const cusFileModel = fileModel;
				cusFileModel.users.push({ email: emailToRemove });
				fs.writeFileSync(fileName, JSON.stringify(cusFileModel, null, 2));
			} catch (e) {
				if (e) fail(`Failed to create temporary file: ${fileName}`);
			}
		});
		it('should create temp file and and check if email was removed', function () {
			const user = new User(emailToRemove);
			const userRepository = new FileUserRepository();
			userRepository.setDatabaseFile(fileName);

			userRepository.remove(user);
			const result = require('../../../../' + fileName);

			expect(
				result.users.some((item: FileUserModel) => item.email === emailToRemove),
			).toBeFalsy();
		});
		afterAll(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
});
