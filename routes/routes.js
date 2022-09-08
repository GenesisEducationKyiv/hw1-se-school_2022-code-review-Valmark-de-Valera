const multer = require('multer');
const upload = multer();
const SubscribersController = require('../controllers/subscribers.controller');
const RatesController = require('../controllers/rates.controller');

const router = (app) => {
	// General requests
	app.get('/api/rate', (request, response) => {
		RatesController.getBtcUahRateAsync(response);
	});
	app.post('/api/subscribe', upload.none(), (request, response) => {
		let email = request.body.email;
		SubscribersController.addSubscriber(email, response);
	});
	app.post('/api/sendEmails', (request, response) => {
		SubscribersController.sendEmailsAsync(response);
	});

	// Additional requests
	app.delete('/api/unsubscribe', (request, response) => {
		SubscribersController.removeSubscriber(request.body.email, response);
	});
	app.get('/api/subscribers', (request, response) => {
		SubscribersController.getAllSubscribers(response);
	});
	app.put('/api/changeProviderByName', (request, response) => {
		let name = request.body.name;
		RatesController.changeProviderByNameAsync(name, response);
	});
	app.put('/api/changeProviderByKey', (request, response) => {
		let key = request.body.key;
		RatesController.changeProviderByKeyAsync(key, response);
	});
};

module.exports = router;
