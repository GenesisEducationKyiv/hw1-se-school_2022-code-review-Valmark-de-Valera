const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
require('dotenv').config();

/**
 * Service that works with SMTP providers and send emails to saved emails.
 */
class EmailService {
    /**
     * Actual mail transporter.
     */
    static transporter = undefined;

    constructor () {
        this.init();
    }

    /**
     * Transporter setup.
     */
    init () {
        if (!this.transporter) {
            // Create mail transporter.
            try {
                this.transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: process.env.Host,
                    auth: {
                        user: process.env.Email,
                        pass: process.env.Password
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

    /**
     * Send email template with rate to user.
     *
     * @param {string} email - email to send.
     * @param {number} rate - rate value to send.
     * @return {boolean} - return true is send success.
     */
    async sendRateMailAsync (email, rate) {
        if (typeof email !== 'undefined') {
            try {
                const htmlTemplate = await fs.readFile('templates/mail-template.html', { encoding: 'utf-8' });
                return new Promise((resolve, reject) => {
                    const template = handlebars.compile(htmlTemplate);
                    const replacements = {
                        BTC_rate: rate.toString()
                    };
                    const htmlToSend = template(replacements);
                    const mailOptions = {
                        from: process.env.Email,
                        to: email,
                        subject: `Курс BTC/UAH на ${new Date().toLocaleDateString()}`,
                        headers: {
                            'Mime-Version': '1.0',
                            'X-Priority': '3',
                            'Content-type': 'text/html; charset=iso-8859-1'
                        },
                        html: htmlToSend
                    };
                    this.transporter.sendMail(mailOptions, (err, info) => {
                        if (err !== null) {
                            console.log(err);
                            resolve(false);
                        } else {
                            console.log(`Email sent to ${email} at ${new Date().toISOString()}`);
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
