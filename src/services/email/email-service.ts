import nodemailer from 'nodemailer';
import handlebars, { Exception } from 'handlebars';
import { promises as fs } from 'fs';
import logFab from '../logger';
import 'dotenv/config';
import { validateEmail } from '../utils';
import { injectable } from 'inversify';
const log = logFab('EmailService');

@injectable()
class EmailService {
	private _transporter: nodemailer.Transporter | undefined;

	constructor() {
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
			log.error(`Error creating transport: ${(e as Exception).message}`);
		}
	}

	async sendRateMailAsync(email: string, rate: string): Promise<boolean> {
		if (!validateEmail(email)) return false;
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
			log.error(`Failed to send email: ${(e as Exception).message}`);
			return false;
		}
	}
}

export default EmailService;
