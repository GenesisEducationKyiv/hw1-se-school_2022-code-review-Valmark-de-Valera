const cron = require('node-cron');
const SubscribersController = require('../controllers/subscribers.controller');

class AutomationCronService {
	static async start() {
		// Schedule tasks to be run on the server.
		// Config: minute | hour | day_of_month | month | day_of_week
		// * means every [time]
		cron.schedule('0 9 * * *', function () {
			console.log('----------------------');
			console.log('-- Running Cron Job --');
			console.log('----------------------');

			SubscribersController.sendEmailsAsync();
		});
	}
}

module.exports = AutomationCronService;
