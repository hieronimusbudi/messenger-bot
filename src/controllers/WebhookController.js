const WebHookGreeting = require("../application/useCases/WebHookGreeting");
const WebHookVerification = require("../application/useCases/WebHookVerification");


module.exports = (dependencies) => {
    const { messageRepository, userRepository } = dependencies.databaseService;
    const { conversationalUserInterface } = dependencies;

    const webhookSendMessage = (req, res, next) => {
        // init use case
        const webhookGreetingCommand = WebHookGreeting(conversationalUserInterface, messageRepository, userRepository);

        // call use case
        webhookGreetingCommand.Execute(req.body)
            .then((response) => {
                if (response.delivered) {
                    res.status(200).end();
                } else {
                    next('message delivered failed');
                }
            }, (err) => {
                next(err);
            })
    }

    const verification = (req, res, next) => {
        const verificationCommand = WebHookVerification();

        // call use case
        verificationCommand.Execute(req.query)
            .then((response) => {
                if (response) {
                    res.status(200).send(req.query["hub.challenge"]);
                } else {
                    res.status(403).end();
                }
            }, (err) => {
                next(err);
            });
    }

    return {
        webhookSendMessage,
        verification,
    };
}