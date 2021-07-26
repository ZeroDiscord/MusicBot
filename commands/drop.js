const { MessageEmbed } = require("discord.js");
const { COLOR } = require("../config.json");
module.exports = {
  name: "drop",
  description: "Drop The Song From Queue",
  aliases: ["d"],
  execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);
    const { channel } = message.member.voice;
    if (!channel) {
      embed.setAuthor(":x: Must be in a voice channel before executing");
      return message.channe.send(embed);
    }

    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("The Queue is empty");
      return message.channel.send(embed);
    }

    if (isNaN(args[0])) {
      embed.setAuthor("Please Use Numerical Values Only");
      return message.channel.send(embed);
    }

    if (parseInt(args[0]) > serverQueue.songs.length) {
      embed.setAuthor("Unable to find this song");
      return message.channel.send(embed);
    }

    serverQueue.songs.splice(parseInt(args[0]) - 1, 1);
    embed.setDescription("✅ | Dropped the song from queue");
    embed.setThumbnail(client.user.displayAvatarURL());
    return message.channel.send(embed);
  }
};
