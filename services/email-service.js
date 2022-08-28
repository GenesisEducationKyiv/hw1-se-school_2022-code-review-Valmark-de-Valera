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
		if (typeof email !== 'undefined') {
			try {
				const htmlTemplate = await fs.readFile(
					'templates/mail-template.html',
					{ encoding: 'utf-8' }
				);
				return new Promise((resolve) => {
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
					this.transporter.sendMail(mailOptions, (err) => {
						if (err !== null) {
							console.log(err);
							resolve(false);
						} else {
							console.log(
								`Email sent to ${email} at ${new Date().toISOString()}`
							);
							resolve(true);
						}
					});
				});
			} catch (e) {
				console.log(e);
				return false;
			}
		} else {
			return false;
		}
	}
}

module.exports = EmailService;
