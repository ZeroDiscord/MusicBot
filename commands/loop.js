const { MessageEmbed } = require("discord.js");
const { COLOR } = require("../config.json");

module.exports = {
  name: "loop",
  description: "Loop Your Queue and have fun",
  aliases: ["round"],
  execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor(
        "❌ | Must be in a voice channel before executing this command"
      );
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("There is nothing playing that I could loop");
      return message.channel.send(embed);
    }

    //OOOOF
    serverQueue.loop = !serverQueue.loop;

    embed.setDescription(
      `Loop is now **${serverQueue.loop ? "Enabled" : "Disabled"}**`
    );
    embed.setThumbnail(client.user.displayAvatarURL());
    message.channel.send(embed);
  }
};
