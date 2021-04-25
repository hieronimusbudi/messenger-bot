const UserRepositoryContract = require("../../../application/contracts/UserRepositoryContract");

module.exports = class InMemoryUserRepository extends UserRepositoryContract {
    constructor() {
        super();
        this.users = [];
        this.currentId = 0;
    }

    async add(userInstance) {
        try {
            this.currentId = this.currentId + 1;
            userInstance.id = this.currentId;
            this.users.push(userInstance);
        } catch (error) {
            throw new Error('Error Occurred');
        }

        return userInstance;
    }

    async update(userInstance) {
        let user;
        try {
            user = await this.getById(userInstance.id);
            if (user) {
                user.name = userInstance.name ?? user.name;
                user.name = userInstance.birthday ?? user.birthday;

                const id = parseInt(user.id);
                const userIdx = this.users.findIndex(u => u.id === id);
                this.users[userIdx] = user;
            }
        } catch (error) {
            console.log(error);
            throw new Error('Error Occurred');
        }

        return userInstance;
    }

    async getById(userId) {
        let user;
        try {
            const id = parseInt(userId);
            user = this.users.find(u => u.id === id);
        } catch (err) {
            throw new Error('Error Occurred');
        }

        return user;
    }

    async getBySenderId(senderId) {
        let user;
        try {
            user = this.users.find(u => u.senderId === senderId);
        } catch (err) {
            throw new Error('Error Occurred');
        }

        return user;
    }


    async getAll() {
        return this.users;
    }
}