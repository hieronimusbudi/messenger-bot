module.exports = class MessageRepositoryContract {
    constructor() { }

    add(messageInstance) {
        return Promise.reject(new Error('not implemented'));
    }

    delete(messageId) {
        return Promise.reject(new Error('not implemented'));
    }

    getById(messageId) {
        return Promise.reject(new Error('not implemented'));
    }

    getAll() {
        return Promise.reject(new Error('not implemented'));
    }

    getAllBySenderId(senderId) {
        return Promise.reject(new Error('not implemented'));
    }

    getAllPreviousMessage(senderId) {
        return Promise.reject(new Error('not implemented'));
    }
};