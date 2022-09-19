import cron from 'node-cron';
import logFab from '../logger';
import 'dotenv/config';
import SubscribersService from '../subscriber/subscriber-service';
const log = logFab('AutomationCronService');

class AutomationCronService {
	private subscriberService = new SubscribersService();
	public async start() {
		const subscriberServiceLocal = this.subscriberService;
		// Schedule tasks to be run on the server.
		// Config: minute | hour | day_of_month | month | day_of_week
		// * means every [time]
		cron.schedule('0 9 * * *', function () {
			log.info('Send mails automation executed successfully');
			subscriberServiceLocal.sendEmailsAsync();
		});
	}
}

export default AutomationCronService;
