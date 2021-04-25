module.exports = class DBServicesContract {
    constructor() {
        this.messageRepository = null;
        this.userRepository = null;
    }

    initDatabase() {
        return Promise.reject(new Error('not implemented'));
    }

};
