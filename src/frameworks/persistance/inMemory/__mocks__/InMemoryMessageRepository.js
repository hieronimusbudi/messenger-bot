
const InMemoryMessageRepository = {
    add: jest
        .fn()
        .mockImplementation(
            async (messageInstance) => {
                messageInstance.id = 1;
                return Promise.resolve(messageInstance)
            }
        )
}

module.exports = InMemoryMessageRepository