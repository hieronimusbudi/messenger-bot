const projectDependencies = require("../../../configs/projectDependencies");
const Message = require("../../../entities/Message");
const AddMessage = require("../AddMessage");
const GetAllMessages = require("../GetAllMessages");

test('successfuly get all messages', async () => {
    const { messageRepository } = projectDependencies.databaseService;

    const addMessageCommand = await AddMessage(messageRepository);
    const getAllMessagesCommand = await GetAllMessages(messageRepository);

    const newMessage = new Message(
        1,
        1010101,
        1010102,
        123,
        'hello world',
        1,
    );

    const savedResult1 = await addMessageCommand.Execute(
        newMessage.userId,
        newMessage.senderId,
        newMessage.recipientId,
        newMessage.timestamp,
        newMessage.text,
        newMessage.intent
    );

    const savedResult2 = await addMessageCommand.Execute(
        newMessage.userId,
        newMessage.senderId,
        newMessage.recipientId,
        newMessage.timestamp,
        newMessage.text,
        newMessage.intent
    );

    const results = await getAllMessagesCommand.Execute();
    expect(results[0].id).toBe(1);
    expect(results[1].id).toBe(2);
});