const express = require('express');
const MessageController = require('../../../controllers/MessageController');

const messagesRouter = (dependencies) => {
    const router = express.Router();
    const frontUrl = "messages";

    const controller = MessageController(dependencies);

    router.route(`/${frontUrl}`)
        .get(controller.getAllMessages);

    router.route(`/${frontUrl}/:messageId`)
        .get(controller.getMessage)
        .delete(controller.deleteMessage);

    return router;
}

module.exports = messagesRouter;