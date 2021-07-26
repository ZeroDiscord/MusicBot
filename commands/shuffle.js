const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");

module.exports = {
  name: "shuffle",
  description: "Shuffle your queue and have fun!",
  aliases: ["sh"],
  async execute(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("There are no songs that I could shuffle");
    try {
      let songs = serverQueue.songs;
      for (let m = songs.length - 1; m > 1; m--) {
        let x = 1 + Math.floor(Math.random() * m);
        [songs[m], songs[x]] = [songs[x], songs[m]];
      }
      serverQueue.songs = songs;
      await message.client.queue.set(message.guild.id, serverQueue);
      message.react("🔀");
    } catch (error) {
      message.guild.member.voice.channel.leave();
      message.client.queue.delete(message.guild.id);
      return message.channel.send(
        `:notes: The player has stopped and the queue has been cleared.: \`${error}\``
      );
    }
  }
};
