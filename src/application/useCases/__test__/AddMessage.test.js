const projectDependencies = require("../../../configs/projectDependencies");
const Message = require("../../../entities/Message");
const InMemoryMessageRepository = require("../../../frameworks/persistance/inMemory/InMemoryMessageRepository");

const AddMessage = require("../AddMessage")

test('successfuly add message', async () => {
    const { messageRepository } = projectDependencies.databaseService;
    const addMessageCommand = await AddMessage(messageRepository);

    const newMessage = new Message(
        1,
        1010101,
        1010102,
        123,
        'hello world',
        1,
    );

    const result = await addMessageCommand.Execute(
        newMessage.userId,
        newMessage.senderId,
        newMessage.recipientId,
        newMessage.timestamp,
        newMessage.text,
        newMessage.intent
    );

    expect(result.id).toBe(1);
    expect(result.senderId).toBe(1010101);
    expect(result.recipientId).toBe(1010102);
    expect(result.timestamp).toBe(123);
    expect(result.text).toBe('hello world');
    expect(result.intent).toBe(1);
});

test('null & incomplete add message parameters', async () => {
    const { messageRepository } = projectDependencies.databaseService;
    const addMessageCommand = await AddMessage(messageRepository);

    const newMessage = new Message(
        1,
        null,
        '',
        123,
        'hello world',
        1,
    );

    const execute = async () => {
        return await addMessageCommand.Execute(
            newMessage.userId,
            newMessage.senderId,
            newMessage.recipientId,
            newMessage.timestamp,
            newMessage.text,
            newMessage.intent
        );
    }

    await expect(execute).rejects.toThrow(Error);
})