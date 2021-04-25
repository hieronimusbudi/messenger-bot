module.exports = class Message {
    constructor(userId, senderId, recipientId, timestamp, text, intent) {
        this.id = null;
        this.userId = userId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.timestamp = timestamp;
        this.text = text;
        this.intent = intent;
    }
}