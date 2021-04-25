const Message = require('../../entities/Message');

module.exports = (messageRepository) => {
    async function Execute() {
        return messageRepository.getAll();
    }
    return {
        Execute
    };
};
