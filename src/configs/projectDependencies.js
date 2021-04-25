const InMemoryDBServices = require('../frameworks/persistance/inMemory/InMemoryDBServices');
const DFConversationalUserInterface = require('../frameworks/conversationalUI/dialogFlow/DFConversationalUserInterface');
const SimpleConversationalUserInterface = require('../frameworks/conversationalUI/simple/SimpleConversationalUserInterface');

module.exports = (() => {
    const databaseService = new InMemoryDBServices();
    // const conversationalUserInterface = new DFConversationalUserInterface();
    const conversationalUserInterface = new SimpleConversationalUserInterface();

    return {
        databaseService: databaseService,
        conversationalUserInterface: conversationalUserInterface
    };
})();
