module.exports = class UserRepositoryContract {
    constructor() { }

    add(userInstance) {
        return Promise.reject(new Error('not implemented'));
    }

    update(userInstance) {
        return Promise.reject(new Error('not implemented'));
    }

    getById(userId) {
        return Promise.reject(new Error('not implemented'));
    }

    getAll() {
        return Promise.reject(new Error('not implemented'));
    }

    getSenderId(senderId) {
        return Promise.reject(new Error('not implemented'));
    }
};