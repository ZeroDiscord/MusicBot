const moment = require('dayjs');
const { guildId } = require('../settings/settings.json');
module.exports = {
	name: 'ready',
	/**
     * @param {import("discord.js").Client} client Represent the bot `Client`
     * @param {...string} _args
     * @param {import('discord.js').Collection<string, object>} appcommands
     */
	async run(_args, appcommands, client) {
		try {
			const time = moment().format('YYYY MM DD HH:mm:ss');
			const fetchguild = await client.guilds.fetch(guildId);
			const fetch = await fetchguild.commands.fetch();
			const remote = fetch.find((cmd) =>cmd.name === 'deploy');
			if (remote) {
				console.log('command deploy have already registered on Discord');
				void client.user.setActivity(`/help ${ client.guilds.cache.size} server(s)`, { type: 'PLAYING' });
			}

			else {
				const deploy = appcommands.get('deploy');
				await client.guilds.cache.get(guildId).commands.create(deploy);
				console.log('Command deploy have been registered to Discord');
				void client.user.setActivity(`/help ${ client.guilds.cache.size} server(s)`, { type: 'PLAYING' });
			}

			setInterval(async () => {
				const commands = await client.application.commands.fetch();
				void client.user.setActivity(`/${commands.random().name} for ${client.guilds.cache.size} server(s)`, { type: 'PLAYING' });
			}, (20 * 60 * 1000));
			console.log(`Logged in as ${client.user.tag} at ${time}`);
		}
		catch (error) {
			console.warn(error);
		}
	},
};
