//FIRST TEST HANDLER IS WORKING OR NOT
const Discord = require("discord.js");
module.exports = {
  name: "ping",
  description: "Pinging the bot",
  execute(client, message, args) {
    let ping = new Discord.MessageEmbed()
      .setTitle(`Client Latency`)
      .setDescription(`${client.ws.ping}ms`);
    message.channel.send(ping);
  }
};
