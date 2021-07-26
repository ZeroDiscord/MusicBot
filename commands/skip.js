const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");

module.exports = {
  name: "skip",
  description: "Skip the song or shift yourself to next song",
aliases: ["remove"],
  async execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);

    const { channel } = message.member.voice;

    if (!channel) {
      embed.setAuthor("❌ |  Must be in a Voice Channel");
      return message.channel.send(embed);
    }
    const serverQueue = message.client.queue.get(message.guild.id);
    const vote = message.client.vote.get(message.guild.id);
    if (!serverQueue) {
      embed.setAuthor("❌ |  There is nothing playing that I could skip");
      return message.channel.send(embed);
    }

    const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2);
    const fx = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1);
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      if (vote.vote > fx) {
        serverQueue.connection.dispatcher.end();
        embed.setDescription("Vote - Skip | Skipping The Song");
        embed.setThumbnail(client.user.displayAvatarURL());
        return message.channel.send(embed);
      }

      if (vote.voters.includes(message.author.id)) {
        return message.channel.send(
          "You have already voted for skipping this song"
        );
      }

      if (vcvote === 2) {
        serverQueue.connection.dispatcher.end();
        embed.setDescription("✅ | Skipping The Song");
        embed.setThumbnail(client.user.displayAvatarURL());
        return message.channel.send(embed);
      }

      vote.vote++;
      vote.voters.push(message.author.id);
      return message.channel.send(
        `You Voted for the Song to Skip, Now we need **${Math.floor(
          vcvote - vote.vote
        )}** votes to skip the song`
      );
    }

    serverQueue.connection.dispatcher.end();
    embed.setDescription("✅ | Skipping The Song");
    embed.setThumbnail(client.user.displayAvatarURL());
    message.channel.send(embed);
  }
};
