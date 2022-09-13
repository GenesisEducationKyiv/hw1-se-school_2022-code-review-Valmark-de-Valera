const winston = require('winston');

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({
			format: winston.format.printf((options) => {
				options.moduleName = options.moduleName ? (options.moduleName += ':') : '';
				return `[${options.moduleName}${options.level}] ${options.message}`;
			}),
		}),
	],
});

module.exports = function (moduleName) {
	return logger.child({ moduleName: moduleName });
};
