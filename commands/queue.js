const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");

module.exports = {
  name: "queue",
  description: "Get all the song name which are in queue",
aliases: ["q",'list'],
  execute: (client, message, args) => {
    let embed = new MessageEmbed().setColor(COLOR);
    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("❌ | You need to be in a Voice Channel Before executing this command");
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("There is nothing in the queue");
      return message.channel.send(embed);
    }

    embed.setDescription(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
    embed.setThumbnail(client.user.displayAvatarURL())
    
    message.channel.send(embed);
  }
};

