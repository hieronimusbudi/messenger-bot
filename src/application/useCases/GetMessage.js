const Message = require('../../entities/Message');

module.exports = (messageRepository) => {
    async function Execute(messageId) {
        return messageRepository.getById(messageId);
    }
    return {
        Execute
    };
};
