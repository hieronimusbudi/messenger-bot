const projectDependencies = require("../../../configs/projectDependencies");
const WebHookGreeting = require("../WebHookGreeting");

test('successfuly greeting chat', async () => {
    const { messageRepository, userRepository } = projectDependencies.databaseService;
    const conversationalUserInterface = projectDependencies.conversationalUserInterface;
    await conversationalUserInterface.init();

    const webhookGreetingCommand = WebHookGreeting(conversationalUserInterface, messageRepository, userRepository);
    let requestBody = {
        object: 'page',
        entry: [
            {
                id: '103924881843722',
                time: 1619323207160,
                messaging: [
                    {
                        sender: { id: 123 },
                        recipient: { id: 456 },
                        timestamp: 1619323207160,
                        message: { text: 'john doe' },
                    }
                ]
            }
        ]
    }

    let response = await webhookGreetingCommand.Execute(requestBody);
    expect(response.delivered).toBe(true);
    expect(response.message).toBe("When is your birthday?");

    requestBody.entry[0].messaging[0].message.text = '2000-11-21';
    response = await webhookGreetingCommand.Execute(requestBody);
    expect(response.delivered).toBe(true);
    expect(response.message).toBe("Do you want to know how many days till your next birthday?");

    requestBody.entry[0].messaging[0].message.text = 'yes';
    response = await webhookGreetingCommand.Execute(requestBody);
    expect(response.delivered).toBe(true);
    expect(response.message).toBe("There are 209 days left until your next birthday.");
});