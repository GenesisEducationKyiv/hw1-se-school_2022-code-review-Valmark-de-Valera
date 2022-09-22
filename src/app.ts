import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import logFab from './services/logger';
import 'dotenv/config';
import { getRouteInfo, InversifyExpressServer } from 'inversify-express-utils';
import * as prettyjson from 'prettyjson';
import './controllers/subscribers.controller';
import './controllers/rates.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { container } from './inversify.config';
const app = express();
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
const routeInfo = getRouteInfo(container);
log.info(prettyjson.render({ routes: routeInfo }));
serverInstance.listen(port, host, (error?: number) => {
	if (error) return log.error(error);
	log.info(`Server running on ${host}:${port}`);
});

export default server;
