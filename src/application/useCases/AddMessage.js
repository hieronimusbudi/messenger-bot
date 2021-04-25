const Message = require('../../entities/Message');

module.exports = (messageRepository) => {

    async function Execute(userId, senderId, recipientId, timestamp, text, intent) {
        // validate
        if (!userId || !senderId || !recipientId || !timestamp || !text || !intent) {
            throw new Error('validation failed');
        }

        // create new message object
        let newMessage = new Message(userId, senderId, recipientId, timestamp, text, intent);

        // persist message
        newMessage = await messageRepository.add(newMessage);

        return newMessage;
    }
    return {
        Execute
    };
};
