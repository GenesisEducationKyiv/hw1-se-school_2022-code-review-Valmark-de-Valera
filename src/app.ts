import 'reflect-metadata';
import bodyParser from 'body-parser';
import logFab from './services/logger';
import 'dotenv/config';
import { InversifyExpressServer } from 'inversify-express-utils';
import './controllers/subscribers.controller';
import './controllers/rates.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { container } from './inversify.config';
const log = logFab('App');

// Settings
const host = process.env.SERVER_HOST || '0.0.0.0';
const port = Number(process.env.SERVER_PORT || '8080');

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
	app.use(
		bodyParser.urlencoded({
			extended: true,
		})
	);
	app.use(bodyParser.json());
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});
const serverInstance = server.build();
serverInstance.listen(port, host, (error?: number) => {
	if (error) return log.error(error);
	log.info(`Server running on ${host}:${port}`);
});

export default server;
