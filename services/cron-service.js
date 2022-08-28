const cron = require('node-cron');
const SubscribersController = require('../controllers/subscribers.controller');

/**
 * Automation service for send email every day
 */
class AutomationCronService {
    /**
     * Start automation service.
     */
    static async start () {
        // Schedule tasks to be run on the server.
        cron.schedule('0 9 * * *', function () {
            console.log('----------------------');
            console.log('-- Running Cron Job --');
            console.log('----------------------');

            SubscribersController.sendEmailsToSubscribersAsync();
        });
    }
}

module.exports = AutomationCronService;
