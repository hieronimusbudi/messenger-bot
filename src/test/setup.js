const projectDependencies = require("../configs/__mocks__/projectDependencies");

jest.mock("../configs/projectDependencies");
jest.mock("../frameworks/conversationalUI/simple/SimpleConversationalUserInterface.js");

beforeAll(async () => {
    projectDependencies.databaseService.initDatabase();
})

beforeEach(async () => {
    jest.clearAllMocks();
})