const cron = require('node-cron');
const log = require('../logger')('AutomationCronService');
const SubscribersController = require('../../controllers/subscribers.controller');

class AutomationCronService {
	static async start() {
		// Schedule tasks to be run on the server.
		// Config: minute | hour | day_of_month | month | day_of_week
		// * means every [time]
		cron.schedule('0 9 * * *', function () {
			log.info('Send mails automation executed successfully');
			SubscribersController.sendEmailsAsync();
		});
	}
}

export default AutomationCronService;
