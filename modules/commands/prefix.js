const fs = require("fs");
module.exports.config = {
    name: "prefix",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "joshuaApostol",//palitan mo lang kingina ka
    description: "hihihihi",
  usePrefix: false,
    commandCategory: "no prefix",
    usages: "prefix",
    cooldowns: 1,
};

module.exports.handleEvent = function ({ api, event, client, __GLOBAL }) {
    var { threadID, messageID, senderID } = event;
    var senderName = "";
    api.getUserInfo(senderID, (err, result) => {
        if (err) {
            console.error(err);
            senderName = "";
        } else {
            senderName = result[senderID].name;
        }
        if (
            event.body.indexOf("prefix") == 0 ||
            event.body.indexOf("Prefix") == 0 ||
            event.body.indexOf("PREFIX") == 0 ||
            event.body.indexOf("prefi") == 0
        ) {
            // Send text message with prefix information
            api.sendMessage(
                {
                    body: `🛑‎━━━━━━━━━━━━━━🛑
GP NAME : https://facebook.com/groups/221629220951298/
━━━━━━━━━━━━━━━━
MY prefix is : ${global.config.PREFIX}
━━━━━━━━━━━━━━━━━
time : ${global.client.getTime("fullTime")}

🛑━━━━━━━━━━━━━━━🛑
DEVELOPER :  https://www.facebook.com/profile.php?id=100088690249020`,
                    attachment: fs.createReadStream(
                        __dirname + `/noprefix/prefix.jpg`
                    ),
                },
                threadID,
                messageID
            );

            // Send voice message with additional information
            const voiceFile = fs.readFileSync(
                __dirname + "/noprefix/prefix.jpg"
            );
            api.sendMessage(
                {
                    attachment: voiceFile,
                    type: "audio",
                    body: "Hey, listen to my prefix information!",
                },
                threadID,
                () => {}
            );

            api.setMessageReaction("🥵", event.messageID, (err) => {}, true);
        }
    });
};
module.exports.run = function ({ api, event, client, __GLOBAL }) {};