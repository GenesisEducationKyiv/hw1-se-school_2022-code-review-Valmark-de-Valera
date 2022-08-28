const swaggerUi = require('swagger-ui-express'); const swaggerDocument = require('./swagger.json');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const AutomationCronService = require('./services/cron-service');
const app = express();

// Settings
const host = '0.0.0.0';
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

routes(app);

// Automation Service to send emails every day (Disabled by default)
// AutomationCronService.start()

app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.listen(port, host, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server running on ${host}:${port}`);
});
