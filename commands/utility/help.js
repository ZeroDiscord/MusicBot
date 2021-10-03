const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Show my available commands',
	guildOnly: false,
	cooldown: 5,
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async slashcommand(interaction) {
		try {
			await interaction.deferReply({ ephemeral:true });
			const global = await interaction.client.application.commands.fetch();
			const guild = await interaction.guild.commands.fetch();
			const guildArray = [];
			const globalArray = [];
			guild.each((command) => {
				guildArray.push(`**/${command.name}** - ${command.description}`);
			});
			global.each((command) => {
				globalArray.push(`**/${command?.name}** - ${command?.description}`);
			});
			const embed = new MessageEmbed(
				{
					title: 'Commands for Hanyuu',
					color: 'RANDOM',
					description: `**Global commands:**\n${globalArray.join('\n')}\n\n**Guild commands:**\n${guildArray.join('\n')}`,
					fields: [
						{
							name: '\u200b',
							value: '**P.S** : If it first time adding the bot, there might be delay on synchronizing the slash commands to your server/guild.\nSome of the commands have subcommands that not shown here, each subcommand(s) will be shown when you typing the main command',
							inline: false,
						},
					],
				},
			);
			return interaction.editReply({ embeds: [embed] });
		}
		catch (err) {console.error(err);}
		return interaction.editReply({ content: 'Something wrong happen with the slash command' });
	},
};