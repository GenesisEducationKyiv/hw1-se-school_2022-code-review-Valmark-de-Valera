const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const log = require('services/logger')('App');
const app = express();
require('dotenv').config();

// Settings
const host = process.env.ServerHost;
const port = process.env.ServerPort;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

routes(app);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, host, (error) => {
	if (error) return log.error(error);
	log.info(`Server running on ${host}:${port}`);
});
