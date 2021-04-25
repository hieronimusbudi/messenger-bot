module.exports = class ConversationalUIContract {
    constructor() {
        this.manager = null;
    }

    init() {
        return Promise.reject(new Error('not implemented'));
    }
    processMessage(event) {
        return Promise.reject(new Error('not implemented'));
    }
    processGreeting(event) {
        return Promise.reject(new Error('not implemented'));
    }
};
