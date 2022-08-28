const multer = require('multer');
const upload = multer();
const SubscribersController = require('../controllers/subscribers.controller');
const RatesController = require('../controllers/rates.controller');

/**
 * Router of API server.
 */
const router = app => {
    // General requests
    app.get('/api/rate', (request, response) => {
        RatesController.getLastRateAsync(response);
    });
    app.post('/api/subscribe', upload.none(), (request, response) => {
        SubscribersController.addSubscriber(request.body.email, response);
    });
    app.post('/api/sendEmails', (request, response) => {
        SubscribersController.sendEmailsToSubscribersAsync(response);
    });

    // Additional requests
    app.delete('/api/unsubscribe', (request, response) => {
        SubscribersController.removeSubscriber(request.body.email, response);
    });
    app.get('/api/subscribers', (request, response) => {
        SubscribersController.getAllSubscribers(response);
    });
};

// Export the router
module.exports = router;
