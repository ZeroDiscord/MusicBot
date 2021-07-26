const { MessageEmbed } = require("discord.js");
const { COLOR } = require("../config.json");
module.exports = {
  name: "join",
  description: "Join a specific voice channel you are in",
  aliases: ["join", "connect", "j"],
  async execute(client, message, args) {
    let channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send(
        "I'm sorry but you need to be in a voice channel!",
        message.channel
      );

    try {
      const connection = await channel.join();
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
    }

    const embed = new MessageEmbed()
      .setAuthor("Joined Voice Channel")
      .setColor(COLOR)
      .setTitle(`Success`)
      .setDescription(`🎶 Joined The Voice Channel. ${channel}.`)
      .setTimestamp();

    return message.channel.send(embed);
  }
};
