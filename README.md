# Messenger Bot

## Overview

This is answer for AdaKerja Messenger Bot Task.

## How to install

1. Clone this project

```Javascript
git clone https://github.com/hieronimusbudi/messenger-bot.git
```

2. Install dependecies

```Javascript
npm install
```

3. Add Facebook access token in `config.js`, use the copy of `config.copy.js` in `/src/configs/config.copy.js` as template.

```Javascript
{
    PORT: 3000,
    FACEBOOK_ACCESS_TOKEN: 'your facebook access token',
    FACEBOOK_VERIFY_TOKEN: 'your webhook callback verify token'
}
```

5. There is `model.nlp` file as Natural Language Processing file for Bot inside app root folder, if there is no file exists, just start the app normaly using `npm run start` and this file will build automatically using this project dependecies settings at `/src/configs/projectDependencies.js` file. Use `SimpleConversationalUserInterface` in `/src/frameworks/conversationalUI/simple/SimpleConversationalUserInterface.js` as `conversationalUserInterface` to generate `model.nlp` file.

```Javascript
module.exports = (() => {
    const databaseService = new InMemoryDBServices();

    //dependecy at here
    const conversationalUserInterface = new SimpleConversationalUserInterface();

    return {
        databaseService: databaseService,
        conversationalUserInterface: conversationalUserInterface
    };
})();
```

## How to use

1. Use start command to start this app.

```Javascript
npm run start
```

2. If in local environment you will need `ngrok` for reverse proxy and generate https url to be registered in Facebook Webhooks Callback URL.

   1. If don't have `ngrok` please download at [https://ngrok.com/download](https://ngrok.com/download).
   2. Start the http tunnel on port 3000 using this `./ngrok http 3000` command.

3. Connect app with facebook webhooks settings using verification url at [Here](#app-url-list).
4. You can test this app using.

```Javascript
npm run test
```

## App url list

| No  | Path          | Method | Description                                    |
| --- | ------------- | ------ | ---------------------------------------------- |
| 1   | /             | GET    | For facebook webhook callback verification url |
| 2   | /             | POST   | Webhook POST url                               |
| 3   | /messages     | GET    | Get all messages received from users           |
| 4   | /messages/:id | GET    | Get single message by its ID                   |
| 5   | /messages/:id | DELETE | Delete single message by its ID                |

## How the app looked likes

### Chating

If installation process is complete and application is started, user can start to chating on messenger that already connected with this app webhooks url.

1. Greeting sequence

   After user choose `Get Started`, bot will start greeting sequence with this sequence.

   ```Javascript
   // Ask Name ==> Ask Birthday ==> Ask if user want to know how many days until his birthday => Give answer if yes and Goodbye if no
   ```

2. If user already finished all greeting sequence, user will can chat freely with bot or type `greeting` to start greeting sequence again.
