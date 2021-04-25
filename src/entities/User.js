module.exports = class User {
    constructor(firstName, birthDate, senderId) {
        this.id = null;
        this.firstName = firstName;
        this.birthDate = birthDate;
        this.senderId = senderId;
    }
}