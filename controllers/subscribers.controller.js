const Subscriber = require('../models/subscriber.model');
const { validateEmail } = require('../services/utils');
const EmailService = require('../services/email-service');
const RatesController = require('./rates.controller');

/**
 * Controller works with subscriber model via api.
 */
class SubscribersController {
    /**
     * Save email of user to database.
     *
     * @param {string} email - email that should be saved.
     * @param {object} response - express api response object. Use for return rate value to user.
     * @return {boolean} - return true if save success.
     */
    static addSubscriber (email, response = undefined) {
        if (email && validateEmail(email)) {
            if (new Subscriber(email).append()) {
                response?.send('E-mail додано');
            } else {
                response?.status(409).send('Вже є в базі');
                return false;
            }
        } else if (email) {
            response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
            return false;
        } else {
            response?.status(400).send('Відсутній параметр:  email');
            return false;
        }
        return true;
    }

    /**
     * Remove email of user from database.
     *
     * @param {string} email - email that should be removed.
     * @param {object} response - express api response object. Use for return rate value to user.
     * @return {boolean} - return true if remove success.
     */
    static removeSubscriber (email, response = undefined) {
        if (email && validateEmail(email)) {
            if (new Subscriber(email).remove()) {
                response?.send('E-mail видалено');
            } else {
                response?.status(404).send('Пошта вже видалена з бази даних');
                return false;
            }
        } else if (email) {
            response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
            return false;
        } else {
            response?.status(400).send('Відсутній параметр:  email');
            return false;
        }
        return true;
    }

    /**
     * Send email to saved emails with actual BTC rate from provider.
     *
     * @param {object} response - express api response object. Use for return rate value to user.
     * @return {[]} resultArray - return object with boolean array (sending result) and email. Result true if send success.
     */
    static async sendEmailsToSubscribersAsync (response = undefined) {
        const allSubs = SubscribersController.getAllSubscribers();
        const resultArray = [];
        const emailService = new EmailService();
        console.log(`Sending emails to subscribers: ${allSubs}`);
        for (const item of allSubs) {
            resultArray.push({
                email: item,
                success: await emailService.sendRateMailAsync(item, await RatesController.getLastRateAsync())
            });
        }
        console.log(resultArray);
        if (resultArray.length > 0) response?.send(resultArray);
        else response?.status(204).send('В базі відсутня пошта'); // Not return body message
        return resultArray;
    }

    /**
     * Check if email already exist in database.
     *
     * @param {string} email - email that should be checked.
     * @param {object} response - express api response object. Use for return rate value to user.
     * @return {boolean} - return true if email found in database.
     */
    static checkIfExist (email, response = undefined) {
        if (Subscriber.find(email)) {
            response?.send('Користувач існує');
            return true;
        } else {
            response?.send('Користувача не існує');
            return false;
        }
    }

    /**
     * Get emails array that includes database
     *
     * @param {object} response - express api response object. Use for return rate value to user.
     * @return {[]} subscribersArray - return emails array.
     */
    static getAllSubscribers (response = undefined) {
        const subscribersArray = Subscriber.getAll();
        response?.send(subscribersArray);
        return subscribersArray;
    }
}

module.exports = SubscribersController;
