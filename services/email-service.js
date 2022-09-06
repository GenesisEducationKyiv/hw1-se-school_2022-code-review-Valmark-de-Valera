const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
require('dotenv').config();

class EmailService {
	static transporter = undefined;

	constructor() {
		try {
			this.transporter = nodemailer.createTransport({
				service: 'gmail',
				host: process.env.Host,
				auth: {
					user: process.env.Email,
					pass: process.env.Password,
				},
			});
		} catch (e) {
			console.log(e);
		}
	}

	async sendRateMailAsync(email, rate) {
		if (typeof email === 'undefined') return false;
		try {
			console.log(rate);
			const htmlTemplate = await fs.readFile('templates/mail-template.html', {
				encoding: 'utf-8',
			});
			const template = handlebars.compile(htmlTemplate);
			const replacements = {
				BTC_rate: rate.toString(),
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
			let result = await this.transporter.sendMail(mailOptions);
			return result.accepted.length !== 0;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}

module.exports = EmailService;
