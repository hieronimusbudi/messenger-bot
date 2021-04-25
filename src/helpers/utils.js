const request = require("request");
const fetch = require("node-fetch");
const config = require("../configs/config");

exports.isMessangerFirstStarted = (event) => {
    if (event.postback && event.postback.title === 'Get Started' && event.postback.payload === 'first hand shake') return true;
    return false;
}

exports.isMessage = (event) => {
    if (event.message && event.message.text) return true;
    return false;
}

exports.settingGetStartedButton = async () => {
    try {
        const response = await fetch(`https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${config.FACEBOOK_ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                get_started: { payload: "first hand shake" },
            }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error)
    }

    // request({
    //     url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
    //     qs: { access_token: config.FACEBOOK_ACCESS_TOKEN },
    //     method: 'POST',
    //     json: {
    //         get_started: { payload: "first hand shake" },
    //     }
    // });
};

exports.settingGreeting = async () => {
    try {
        const response = await fetch(`https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${config.FACEBOOK_ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "greeting": [
                    {
                        "locale": "default",
                        "text": "Hello welcome to our Messenger Bot"
                    }, {
                        "locale": "en_US",
                        "text": "Hello welcome to our Messenger Bot"
                    }
                ]
            }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error)
    }

    // request({
    //     url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
    //     qs: { access_token: config.FACEBOOK_ACCESS_TOKEN },
    //     method: 'POST',
    //     json: {
    //         "greeting": [
    //             {
    //                 "locale": "default",
    //                 "text": "Hello welcome to our Messenger Bot"
    //             }, {
    //                 "locale": "en_US",
    //                 "text": "Hello welcome to our Messenger Bot"
    //             }
    //         ]
    //     }
    // });
};
