import multer from 'multer';
const upload = multer();
import SubscribersController from '../controllers/subscribers.controller';
import RatesController from '../controllers/rates.controller';
import { Express, Request, Response } from 'express';

const router = (app: Express) => {
	// General requests
	app.get('/api/rate', (request: Request, response: Response) => {
		RatesController.getBtcUahRateAsync(response);
	});
	app.post('/api/subscribe', upload.none(), (request: Request, response: Response) => {
		const email = request.body.email;
		SubscribersController.addSubscriber(email, response);
	});
	app.post('/api/sendEmails', (request: Request, response: Response) => {
		SubscribersController.sendEmailsAsync(response);
	});

	// Additional requests
	app.delete('/api/unsubscribe', (request: Request, response: Response) => {
		SubscribersController.removeSubscriber(request.body.email, response);
	});
	app.get('/api/subscribers', (request: Request, response: Response) => {
		SubscribersController.getAllSubscribers(response);
	});
	app.put('/api/changeProviderByName', (request: Request, response: Response) => {
		const name = request.body.name;
		RatesController.changeProviderByName(name, response);
	});
	app.put('/api/changeProviderByKey', (request: Request, response: Response) => {
		const key = request.body.key;
		RatesController.changeProviderByKey(key, response);
	});
};

export default router;
