const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");

module.exports = {
  name: "nowplaying",
  description: "Get the name of current playing song",
aliases: ["np"],
  execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor(
        "❌ | Need to be in a voice channel before executing this command"
      );
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Bot is not playing anything");
      return message.channel.send(embed);
    }

    embed
      .setDescription(`📀 | **Now Playing** | ${serverQueue.songs[0].title}`)
      .setImage(serverQueue.songs[0].thumbnail);
    embed
      .setThumbnail(serverQueue.songs[0].avatar)
      .setFooter("Want a bot like this? Subscribe to ZeroSync on yt!")
      .addField(`Playing In`, `${channel}`, true)
      .addField(`Bound To`, `${serverQueue.channel}`, true)
      .setTimestamp();
    message.channel.send(embed);
  }
};
