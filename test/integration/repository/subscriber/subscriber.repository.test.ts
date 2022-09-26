/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import fs from 'fs';
import Subscriber from '../../../../src/models/subscriber/subscriber.model';
import logFab from '../../../../src/services/logger';
const fileModel = require('../../../../data/subscribers.json');
import FileSubscriberRepository from '../../../../src/repository/subscriber/file.subscriber.repository';
import 'dotenv/config';
const log = logFab('SubscribersRepositoryTest');

interface FileSubscriberModel {
	email: string;
}

describe('SubscriberRepository', function () {
	describe('#append', function () {
		const fileName = '.tmpTestAdd.json';
		beforeAll(function () {
			try {
				fs.writeFileSync(fileName, JSON.stringify(fileModel, null, 2));
			} catch (e) {
				if (e) log.error(`Failed to create temporary file: ${fileName}`);
			}
		});
		it('should create temp file and add new subscriber email', function () {
			const email = 'test@test.com';
			const subscriber = new Subscriber(email);
			const subscriberRepository = new FileSubscriberRepository(fileName);

			subscriberRepository.append(subscriber);
			const result = require('../../../../' + fileName);

			expect(
				result.subscribers.some((item: FileSubscriberModel) => item.email === email)
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
				if (e) log.error(`Failed to create temporary file: ${fileName}`);
			}
		});
		it('should create temp file and and check if email was removed', function () {
			const subscriber = new Subscriber(emailToRemove);
			const subscriberRepository = new FileSubscriberRepository(fileName);

			subscriberRepository.remove(subscriber);
			const result = require('../../../../' + fileName);

			expect(
				result.subscribers.some((item: FileSubscriberModel) => item.email === emailToRemove)
			).toBeFalsy();
		});
		afterAll(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
});
