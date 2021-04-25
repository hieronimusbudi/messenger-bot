const config = require("../../configs/config");

module.exports = () => {
    async function Execute(requestQuery) {
        const hubMode = requestQuery["hub.mode"];

        const verifyTokenMatches = (requestQuery["hub.verify_token"] === config.FACEBOOK_VERIFY_TOKEN);
        if (hubMode && verifyTokenMatches) {
            return true;
        } else {
            return false;
        }
    }
    return {
        Execute
    };
};