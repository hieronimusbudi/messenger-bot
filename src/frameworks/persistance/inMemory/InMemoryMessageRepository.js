const MessageRepositoryContract = require("../../../application/contracts/MessageRepositoryContract");

module.exports = class InMemoryMessageRepository extends MessageRepositoryContract {
    constructor() {
        super();
        this.messages = [];
        this.currentId = 0;
    }

    async add(messageInstance) {
        try {
            this.currentId = this.currentId + 1;
            messageInstance.id = this.currentId;
            this.messages.push(messageInstance);
        } catch (error) {
            throw new Error('Error Occurred');
        }

        return messageInstance;
    }

    async delete(messageId) {
        const id = parseInt(messageId);
        let messageIndex;
        try {
            messageIndex = this.messages.findIndex(m => m.id === id);
            if (messageIndex !== -1) {
                this.messages.splice(messageIndex, 1);
            }
        } catch (error) {
            throw new Error('Error Occurred');
        }

        return true;
    }

    async getById(messageId) {
        let message;
        try {
            const id = parseInt(messageId);
            message = this.messages.find(m => m.id === id);
        } catch (err) {
            throw new Error('Error Occurred');
        }

        return message;
    }

    async getAll() {
        return this.messages;
    }

    async getAllBySenderId(senderId) {
        let messages;
        try {
            messages = this.messages.filter(m => m.senderId === senderId);
        } catch (err) {
            throw new Error('Error Occurred');
        }

        return messages;
    }

    async getPreviousMessage(senderId) {
        let message = null;
        try {
            const allMessage = await this.getAllBySenderId(senderId);
            if (allMessage.length > 0) {
                message = allMessage[allMessage.length - 1];
            }
        } catch (err) {
            throw new Error('Error Occurred');
        }

        return message;

    }
}