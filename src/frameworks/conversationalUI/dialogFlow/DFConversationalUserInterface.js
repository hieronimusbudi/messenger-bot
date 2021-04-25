const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const sendTextMessage = require('../../../helpers/sendTextMessage');
const ConversationalUIContract = require('../../../application/contracts/ConversationalUIContract');

const DIALOGFLOW_CLIENT_CREDENTIALS = require('../../../configs/df-client-key.json');

module.exports = class DFConversationalUserInterface extends ConversationalUIContract {
    constructor() {
        super();

    }

    async init() {
        return true;
    }

    async processMessage(event) {
        const senderId = event.sender.id;
        const message = event.message.text;

        const sessionId = uuid.v4();
        const sessionClient = new dialogflow.SessionsClient({ credentials: DIALOGFLOW_CLIENT_CREDENTIALS });
        const sessionPath = sessionClient.projectAgentSessionPath('bangkok-sukses', sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: message,
                    // The language used by the client (en-US)
                    languageCode: 'en-US',
                },
            },
        }

        const responses = await sessionClient.detectIntent(request);

        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);

        sendTextMessage(senderId, result.fulfillmentText)
    }
};