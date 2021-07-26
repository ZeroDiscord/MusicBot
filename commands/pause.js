const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");

module.exports = {
  name: "pause",
  description: "Pause the cureent playing Song",
  aliases: ["chill"],
  execute(client, message, args) {
    const { channel } = message.member.voice;
    let embed = new MessageEmbed().setColor(COLOR);

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor(
        "❌ | Must be in a voice channel before executing this command"
      );
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("There is nothing playing that i could pause");
      return message.channel.send(embed);
    }

    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true);

      embed.setDescription("✅ | Paused The Current Playing Song");
      embed.setThumbnail(client.user.displayAvatarURL());
      return message.channel.send(embed);
    }
  }
};
