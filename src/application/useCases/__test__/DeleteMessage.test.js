const projectDependencies = require("../../../configs/projectDependencies");
const Message = require("../../../entities/Message");
const AddMessage = require("../AddMessage");
const DeleteMessage = require("../DeleteMessage");

test('successfuly delete message', async () => {
    const { messageRepository } = projectDependencies.databaseService;

    const addMessageCommand = await AddMessage(messageRepository);
    const deleteMessageCommand = await DeleteMessage(messageRepository);

    const newMessage = new Message(
        1,
        1010101,
        1010102,
        123,
        'hello world',
        1,
    );

    const savedResult = await addMessageCommand.Execute(
        newMessage.userId,
        newMessage.senderId,
        newMessage.recipientId,
        newMessage.timestamp,
        newMessage.text,
        newMessage.intent
    );

    const result = await deleteMessageCommand.Execute(1);
    expect(result).toBe(true);
});