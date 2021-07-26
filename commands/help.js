const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { COLOR } = require("../config.json");
module.exports = {
  name: "help",
  description: "Get all commands name and description",
  execute(client, message, args) {
    function cap(command) {
      return command.charAt(0).toUpperCase() + command.slice(1);
    }
    let embed = new MessageEmbed()
      .setAuthor("HELP SECTION", client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(COLOR)
      .setDescription(
        `**These are the commands for ${client.user.username} Bot**`
      );
    let command = readdirSync("./commands");

    let i;
    for (i = 0; i < command.length; i++) {
      console.log(command[i]);

      const cmd = client.commands.get(command[i].replace(".js", ""));
      const x = cap(`${cmd.name}`);
      embed.addField(`${x}`, `\`${cmd.description}\``, true);
    }

    message.channel.send(embed);
  }
};
