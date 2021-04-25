const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const projectDependencies = require('./src/configs/projectDependencies');
const { settingGetStartedButton, settingGreeting } = require('./src/helpers/utils');
const config = require('./src/configs/config');
const ErrorHandler = require('./src/helpers/ErrorHandler');

const app = express();

// load app only if all dependencies ready
(async () => {
    // load dependecies
    await projectDependencies.databaseService.initDatabase();
    console.log('DB initiated!');

    await projectDependencies.conversationalUserInterface.init();
    console.log('Conversational User Interface initiated!');

    const webHookRouter = require('./src/frameworks/web/routes/webhook')(projectDependencies);
    const messagesRouter = require('./src/frameworks/web/routes/messages')(projectDependencies);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // load routes
    app.use('/', messagesRouter);
    app.use('/', webHookRouter);

    // generic error handler
    app.use(ErrorHandler);

    app.listen(config.PORT, async () => {
        await settingGetStartedButton();
        await settingGreeting();
        console.log('Webhook server is listening, port 3000');
    });

})().catch((error) => {
    console.log(error);
});
