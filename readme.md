# Description of project

---

> Attention! SMTP credential will be reset for security reason 

## General

- Node JS (Express API)
- Nodemailer SMTP
- JSON file emulate database
- Rates Provider API controller

## Architecture
API representation of MVC

![Description Scheme](https://github.com/Valmark-de-Valera/Rates-API-server/blob/master/docs/GSES2_Description.jpg?raw=true)

### Activity diagram

![Activity diagram](https://github.com/Valmark-de-Valera/Rates-API-server/blob/master/docs/GSES2_ActivityUML.jpg?raw=true)

## Representing Directory

```
.
├── controllers -- API controllers
│   ├── rates.controller.js
│   └── subscribers.controller.js
├── data
│   └── subscribers.json  -- use for saving emails
├── models -- Models to database
│   └── subscribers.model.js
├── routes -- API router
│   └── routes.js
├── services
│   ├── provider -- Rates providers
│   │   ├── binance.provider.js
│   │   └── test.provider.js
│   ├── cron-service.js -- Automation service
│   ├── email-service.js -- Mail services
│   └── utils.js
├── templates -- Email templates
│   └── mail-template.html
├── .env -- Environment variables
├── app.js -- Server main JS
├── Dockerfile -- Docker command file
└── ...
```

# Docker

---

```bash
docker build --tag <some name> .
```
```bash
docker run -p 49160:8080 <some name>
```
