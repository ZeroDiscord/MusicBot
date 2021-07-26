const { MessageEmbed } = require("discord.js");
const { COLOR } = require("../config.json");

module.exports = {
  name: "jump",
  description: "Jump to any song you like",
aliases: ["skipto","playfrom","play"],
  execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/");
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("There is nothing playing that I could loop");
      return message.channel.send(embed);
    }
    if (!args[0]) {
      embed.setAuthor(`Please Give The Song Number`);
      return message.channel.send(embed);
    }

    if (isNaN(args[0])) {
      embed.setAuthor("Please Use Numerical Values Only");
      return message.channel.send(embed);
    }

    if (serverQueue.songs.length < parseInt(args[0])) {
      embed.setAuthor("Unable To Find This Song in Queue");
      return message.channel.send(embed);
    }
    serverQueue.songs.splice(Math.floor(parseInt(args[0]) - 1), 1);
    serverQueue.connection.dispatcher.end();

    embed.setDescription(`Jumped to song number - ${args[0]}`);
    message.channel.send(embed);
  }
};
