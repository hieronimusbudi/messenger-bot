const Message = require("../../entities/Message");
const User = require("../../entities/User");
const { greetingSequenceEnum } = require("../../helpers/enum");
const sendTextMessage = require("../../helpers/sendTextMessage");
const { isMessangerFirstStarted, isMessage } = require("../../helpers/utils");

module.exports = (conversationalUserInterface, messageRepository, userRepository) => {
    function checkNextSquence(lastMessage) {
        let intent = greetingSequenceEnum.unknown;
        if (lastMessage.intent) {
            switch (lastMessage.intent) {
                case greetingSequenceEnum.startGreeting:
                    intent = greetingSequenceEnum.answerName;
                    break;
                case greetingSequenceEnum.answerName:
                    intent = greetingSequenceEnum.answerBirthday;
                    break;
                case greetingSequenceEnum.answerBirthday:
                    intent = greetingSequenceEnum.answerOption;
                    break;
                default:
                    break;
            }
        }

        return intent;
    }
    async function greetingSequence(event) {
        try {
            if (isMessangerFirstStarted(event)) {
                const result = await sendTextMessage(event.sender.id, 'Hai welcome! What is your first name?');
                let user = new User('', '', event.sender.id);
                user = await userRepository.add(user);

            } else if (isMessage(event)) {
                const prevMessage = await messageRepository.getPreviousMessage(event.sender.id);
                let intent = greetingSequenceEnum.unknown;
                if (prevMessage) {
                    // current user intent
                    intent = checkNextSquence(prevMessage)
                } else if (!prevMessage) {
                    // no previous message, use answer name intent as current user intent
                    intent = greetingSequenceEnum.answerName;
                }

                let user = null;
                user = await userRepository.getBySenderId(event.sender.id);
                if (!user) {
                    user = new User('', '', event.sender.id);
                    user = await userRepository.add(user);
                }

                // find user and update it's property when in greeting sequence
                if (intent >= greetingSequenceEnum.askName && intent <= greetingSequenceEnum.answerOption) {
                    if (intent === greetingSequenceEnum.answerName) {
                        // update user name
                        user.name = event.message.text;
                        user = await userRepository.update(user);
                    } else if (intent === greetingSequenceEnum.answerBirthday) {
                        // update user birthday
                        user.birthday = event.message.text;
                        user = await userRepository.update(user);
                    }
                }

                let botResponse;
                if (intent === greetingSequenceEnum.unknown && event.message.text === 'greeting') {
                    // if not in greeting squence but want to start greeting
                    intent = greetingSequenceEnum.startGreeting;
                    botResponse = await conversationalUserInterface.processGreeting(event, intent, user);
                } else if (intent === greetingSequenceEnum.unknown) {
                    // if not in greeting, route to normal conversation
                    botResponse = await conversationalUserInterface.processMessage(event);
                } else {
                    // if still in greeting sequence
                    botResponse = await conversationalUserInterface.processGreeting(event, intent, user);
                }

                let newMessage = new Message(
                    user.id,
                    event.sender.id,
                    event.recipient.id,
                    event.timestamp,
                    event.message.text,
                    intent);

                await messageRepository.add(newMessage);
                return botResponse;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async function Execute(requestBody) {
        if (!conversationalUserInterface || !messageRepository || !userRepository) {
            throw new Error('dependecies required!');
        }

        let responseMessage;
        if (requestBody.object === "page") {
            for await (let entryEl of requestBody.entry) {
                for await (let event of entryEl.messaging) {
                    try {
                        responseMessage = await greetingSequence(event);
                    } catch (error) {
                        throw new Error(error);
                    }
                }
            }

            return {
                delivered: true,
                message: responseMessage
            }
        }
        throw new Error('error!');
    }
    return {
        Execute
    };
};