const AddMessage = require("../application/useCases/AddMessage");
const DeleteMessage = require("../application/useCases/DeleteMessage");
const GetAllMessages = require("../application/useCases/GetAllMessages");
const GetMessage = require("../application/useCases/GetMessage");

module.exports = (dependencies) => {
    const { messageRepository } = dependencies.databaseService;

    const getMessage = (req, res, next) => {
        // init use case
        const getStudentQuery = GetMessage(messageRepository);

        getStudentQuery.Execute(req.params.messageId).then((message) => {
            res.json(message);
        }, (err) => {
            next(err);
        });
    }
    const deleteMessage = (req, res, next) => {
        // init use case
        const deleteStudentQuery = DeleteMessage(messageRepository);

        deleteStudentQuery.Execute(req.params.messageId).then((message) => {
            res.json(message);
        }, (err) => {
            next(err);
        });
    }
    const getAllMessages = (req, res, next) => {
        // init use case
        const getAllMessagesQuery = GetAllMessages(messageRepository);

        getAllMessagesQuery.Execute().then((messages) => {
            res.json(messages)
        }, (err) => {
            next(err);
        })
    }

    return {
        getAllMessages,
        getMessage,
        deleteMessage,
    };
}