const fetch = require("node-fetch");
const config = require("../configs/config");

const sendTextMessage = async (senderId, text) => {
    try {
        const response = await fetch(`https://graph.facebook.com/v10.0/me/messages?access_token=${config.FACEBOOK_ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipient: { id: senderId },
                message: { text },
            }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error)
    }
};

module.exports = sendTextMessage