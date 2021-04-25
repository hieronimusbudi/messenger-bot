const express = require('express');
const WebhookController = require("../../../controllers/WebhookController");

const webHookRouter = (dependencies) => {
    const router = express.Router();

    const controller = WebhookController(dependencies);

    router.route('/')
        .get(controller.verification)
        .post(controller.webhookSendMessage);

    return router;
}

module.exports = webHookRouter;