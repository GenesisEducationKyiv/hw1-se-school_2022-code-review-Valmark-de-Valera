/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { SubscriberModule } from '../../subscriber.module';
import { FileSubscriberRepository } from '../../subscriber.service/repository/file.subscriber.repository';
import ISubscriberRepository from '../../subscriber.service/repository/interfaces/interface.subscriber.repository';
import { Subscriber } from '../../models/subscriber.model';
const fileModel = require('../../../../data/subscribers.json');
interface FileSubscriberModel {
	email: string;
}

describe('SubscriberRepository', () => {
	let repository: ISubscriberRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [SubscriberModule],
		}).compile();

		repository = module.get<ISubscriberRepository>(FileSubscriberRepository);
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
			const subscriber = new Subscriber(email);
			const subscriberRepository = new FileSubscriberRepository();
			subscriberRepository.setDatabaseFile(fileName);

			subscriberRepository.append(subscriber);
			const result = require('../../../../' + fileName);

			expect(
				result.subscribers.some((item: FileSubscriberModel) => item.email === email),
			).toBeTruthy();
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
				cusFileModel.subscribers.push({ email: emailToRemove });
				fs.writeFileSync(fileName, JSON.stringify(cusFileModel, null, 2));
			} catch (e) {
				if (e) fail(`Failed to create temporary file: ${fileName}`);
			}
		});
		it('should create temp file and and check if email was removed', function () {
			const subscriber = new Subscriber(emailToRemove);
			const subscriberRepository = new FileSubscriberRepository();
			subscriberRepository.setDatabaseFile(fileName);

			subscriberRepository.remove(subscriber);
			const result = require('../../../../' + fileName);

			expect(
				result.subscribers.some(
					(item: FileSubscriberModel) => item.email === emailToRemove,
				),
			).toBeFalsy();
		});
		afterAll(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
});
