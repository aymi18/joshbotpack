const axios = require('axios');
 
module.exports.config = {
  name: "ai",
  version: "1.1",
  hasPermission: 0,
  credits: "August",
  description: "Interact with ai (Artificial Intelligence)",
  usePrefix: false,
  commandCategory: "ai",
  usages: "[prompt] = [response]",
  cooldowns: 3,
};
 
module.exports.run = async function ({ api, event, args }) {
    const { threadID, senderID } = event;
    const prompt = args.join(" ");
 
    if (!prompt) {
        api.sendMessage("ℹ️ | 𝖧𝖾𝗅𝗅𝗈 𝗍𝗁𝖾𝗋𝖾, 𝗁𝗈𝗐 𝖼𝖺𝗇 𝖨 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?", event.threadID, event.messageID);
        return;
    }
 
    try {
        const userName = await getUserName(api, senderID);
        const cariAPI = "https://cari.august-quinn-api.repl.co/response";
        const response = await axios.post(cariAPI, { userID: senderID, userName, prompt });
        const reply = response.data.reply;
 
        api.sendMessage(reply, threadID, event.messageID);
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage("⛔ | 𝗛𝗶𝗴𝗵 𝘁𝗿𝗮𝗳𝗳𝗶𝗰: 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", threadID, event.messageID);
    }
};
 
async function getUserName(api, userID) {
    try {
        const name = await api.getUserInfo(userID);
        return name[userID].firstName;
    } catch (error) {
        console.error("Error getting user name:", error);
        return "Friend";
    }
}