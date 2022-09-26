import winston from 'winston';

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

export default function (moduleName: string) {
	return logger.child({ moduleName: moduleName });
}
