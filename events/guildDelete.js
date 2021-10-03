module.exports = {
	name: 'guildDelete',
	/**
	 * @param {import("discord.js").Guild} guild
	 * @param {import("discord.js").Client} client
	 * @param {import('discord.js').Collection<string, object>} _appcommands
	 */
	run(guild, _appcommands, client) {
		if (!guild.available) return;
		client.user.setActivity(`/help ${client.guilds.cache.size} server`, { type: 'PLAYING' });
		console.log(`[GUILD DELETE] ${guild.name} (${guild.id}) removed the bot`);
	},
};
