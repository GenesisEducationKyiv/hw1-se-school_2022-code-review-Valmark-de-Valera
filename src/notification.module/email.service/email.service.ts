import * as nodemailer from 'nodemailer';
import handlebars, { Exception } from 'handlebars';
import { promises as fs } from 'fs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailService {
	private readonly logger = new Logger(EmailService.name);
	private _subscribersRmqService: ClientProxy;
	private _transporter: nodemailer.Transporter | undefined;

	constructor(@Inject('SUBSCRIBERS_RMQ_SERVICE') _subscribersRmqService: ClientProxy) {
		this._subscribersRmqService = _subscribersRmqService;
		try {
			this._transporter = nodemailer.createTransport({
				service: process.env.Service,
				host: process.env.Host,
				auth: {
					user: process.env.Email,
					pass: process.env.Password,
				},
			});
		} catch (e) {
			this.logger.error(`Error creating transport: ${(e as Exception).message}`);
		}
	}

	async sendRateMailAsync(email: string, rate: string): Promise<boolean> {
		if (!isEmail(email)) return false;
		try {
			const htmlTemplate = await fs.readFile('src/templates/mail-template.html', {
				encoding: 'utf-8',
			});
			const template = handlebars.compile(htmlTemplate);
			const replacements = {
				BTC_rate: rate,
			};
			const htmlToSend = template(replacements);
			const mailOptions = {
				from: process.env.Email,
				to: email,
				subject: `Курс BTC/UAH на ${new Date().toLocaleDateString()}`,
				headers: {
					'Mime-Version': '1.0',
					'X-Priority': '3',
					'Content-type': 'text/html; charset=iso-8859-1',
				},
				html: htmlToSend,
			};
			const result = await this._transporter?.sendMail(mailOptions);
			return result?.accepted.length !== 0;
		} catch (e) {
			this.logger.error(`Failed to send email: ${(e as Exception).message}`);
			return false;
		}
	}
}
