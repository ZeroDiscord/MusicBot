module.exports = {
	name: 'guildCreate',
	/**
	 * @param {import("discord.js").Guild} guild
	 * @param {import("discord.js").Client} client
	 * @param {import('discord.js').Collection<string, object>} _appcommands
	 */
	async run(guild, _appcommands, client) {
		try {
			const checkappcommand = await guild.commands.fetch()
				.catch(()=>{ return 'This guild doesn\'t invite with application.command scope'; });
			if (typeof checkappcommand === 'string') {
				setTimeout(()=>{
					void guild.leave();
				}, (14 * 60 * 1000))
					.unref();
			}
			else {
				const owner = await guild.members.fetch(guild.ownerId);
				client.user.setActivity(`/help ${client.guilds.cache.size} server`, { type: 'PLAYING' });
				console.log(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${owner.user.tag} (${owner.user.id})`);
			}
		}
		catch(error) {
			console.warn(error);
		}
	},
};
