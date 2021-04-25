const Message = require('../../entities/Message');

module.exports = (messageRepository) => {
    async function Execute(messageId) {
        return messageRepository.delete(messageId);
    }
    return {
        Execute
    };
};
