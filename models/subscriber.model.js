const fs = require('fs');
const fileName = 'data/subscribers.json';
const databaseFile = require('../' + fileName);

const subscribers = databaseFile.emails;

/**
 * Model of subscriber that work with json file.
 */
class Subscriber {
    /**
     * Email of user.
     */
    email = undefined;

    constructor (email) {
        this.email = email;
    }

    /**
     * Add email to database.
     *
     * @return {boolean} - return true if save success.
     */
    append () {
        if (subscribers.includes(this.email)) return false;
        subscribers.push(this.email);
        Subscriber.updateDb();
        return true;
    }

    /**
     * Remove email from database.
     *
     * @return {boolean} - return true if remove success.
     */
    remove () {
        if (!subscribers.includes(this.email)) return false;
        const index = subscribers.indexOf(this.email);
        subscribers.splice(index, 1);
        Subscriber.updateDb();
        return true;
    }

    /**
     * Search user email in database.
     *
     * @param {string} email - email that should be removed.
     * @return {string} - return email string or undefined.
     */
    static find (email) {
        const index = subscribers.indexOf(email);
        if (index !== -1) {
            return subscribers[index];
        } else return undefined;
    }

    /**
     * Get array of emails that include database.
     *
     * @return {[]} subscriber - array of emails.
     */
    static getAll () {
        return subscribers;
    }

    /**
     * Update JSON file with subscribers variable.
     */
    static updateDb () {
        databaseFile.emails = subscribers;
        fs.writeFile(fileName, JSON.stringify(databaseFile, null, 2), function writeJSON (err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(databaseFile, null, 2));
            console.log('Writing to ' + fileName);
        });
    }
}

module.exports = Subscriber;
