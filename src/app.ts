import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import logFab from './services/logger';
import 'dotenv/config';
const log = logFab('App');
const app = express();
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

// Settings
const host = process.env.SERVER_HOST || 'localhost';
const port = Number(process.env.SERVER_PORT || '8080');

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

routes(app);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, host, (error?: number) => {
	if (error) return log.error(error);
	log.info(`Server running on ${host}:${port}`);
});
