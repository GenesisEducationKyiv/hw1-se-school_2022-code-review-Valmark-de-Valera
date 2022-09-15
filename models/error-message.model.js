function ErrorMessage(message, code) {
	this.message = message || 'No description provided';
	this.code = code || '500';
	this.stack = new Error().stack;
}

ErrorMessage.prototype.setMessage = function (message) {
	this.message = message || 'No description provided';
	return true;
};

ErrorMessage.prototype.getMessage = function () {
	return this.message;
};

ErrorMessage.prototype.setCode = function (code) {
	this.code = code || '500';
	return true;
};

ErrorMessage.prototype.getCode = function () {
	return this.code;
};

ErrorMessage.prototype = new Error();

module.exports = ErrorMessage;
