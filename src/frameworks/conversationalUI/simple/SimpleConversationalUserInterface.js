const { NlpManager } = require('node-nlp');
const ConversationalUIContract = require("../../../application/contracts/ConversationalUIContract");
const { greetingSequenceEnum } = require('../../../helpers/enum');
const sendTextMessage = require("../../../helpers/sendTextMessage");
const trainNLP = require("./trainNLP");
const date = require('date-and-time');
const emoji = require('node-emoji');

module.exports = class SimpleConversationalUserInterface extends ConversationalUIContract {
    constructor() {
        super();
        this.manager = new NlpManager({ languages: ['en'], forceNER: true });
    }

    async init() {
        await trainNLP(this.manager);
    }

    async processGreeting(event, intent, user) {
        const senderId = event.sender.id;
        let message = event.message.text;
        let managerResponse = null;
        let response = 'Sorry, could you say that again?';
        let botIntent = greetingSequenceEnum.askBirthday;

        try {
            switch (intent) {
                case greetingSequenceEnum.startGreeting:
                    response = 'Holla! What is your first name?';
                    break;
                case greetingSequenceEnum.answerName:
                    response = 'When is your birthday?';
                    break;
                case greetingSequenceEnum.answerBirthday:
                    response = 'Do you want to know how many days till your next birthday?';
                    break;
                case greetingSequenceEnum.answerOption:
                    managerResponse = await this.manager.process('en', message);
                    response = managerResponse.answer;
                    if (response === 'special-yes') {
                        const format = 'YYYY-MM-DD';
                        const now = new Date();
                        date.format(now, format);

                        const birthday = date.parse(user.birthday, format);
                        const nextBirthday = date.parse(`${now.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`, format);
                        const daysLeft = Math.round(date.subtract(nextBirthday, now).toDays());

                        response = `There are ${daysLeft} days left until your next birthday.`;
                    } else if (response === 'special-no') {
                        response = `Goodbye! ${emoji.get('wave')}`
                    }
                    break;
                default:
                    break;
            }

            await sendTextMessage(senderId, response);
            return response;
        } catch (error) {
            throw new Error(error);
        }

    }

    async processMessage(event) {
        const senderId = event.sender.id;
        const message = event.message.text;

        try {
            const managerResponse = await this.manager.process('en', message);
            const response = managerResponse.answer;
            await sendTextMessage(senderId, response);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
};