const { MessageEmbed } = require("discord.js");
const { COLOR } = require("../config.json");

const discord = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Disconnect the bot and take some rest.",
  aliases: ["dc"],
  async execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);

    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor(
        "❌ | You need to be in a voice channel before executing this command"
      );
      return message.channel.send(embed);
    }
    const serverQueue = message.client.queue.get(message.guild.id);
    await channel.leave();
    embed.setAuthor("Successfully Disconnected");
    return message.channel.send(embed);

    serverQueue.songs = [];
  }
};
