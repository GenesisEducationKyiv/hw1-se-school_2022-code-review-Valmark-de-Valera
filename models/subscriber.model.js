const { validateEmail } = require('../services/utils');

function Subscriber(email) {
	if (!validateEmail(email)) throw new Error('Invalid email address');
	this.email = email || null;
}

Subscriber.prototype.setEmail = function (email) {
	if (!validateEmail(email)) return false;
	this.email = email;
	return true;
};

Subscriber.prototype.getEmail = function () {
	return this.email;
};

module.exports = Subscriber;
