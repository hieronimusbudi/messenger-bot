const DBServicesContract = require("../../../application/contracts/DBServicesContract");
const InMemoryMessageRepository = require("./InMemoryMessageRepository");
const InMemoryUserRepository = require("./InMemoryUserRepository");

module.exports = class InMemoryDBServices extends DBServicesContract {
    constructor() {
        super();
        this.messageRepository = new InMemoryMessageRepository();
        this.userRepository = new InMemoryUserRepository();
    }

    async initDatabase() {
        this.seedData();
    }

    async seedData() {

    }
};
