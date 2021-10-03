const { Client, Collection } = require('discord.js');
const fastGlob = require('fast-glob');
const { token } = require('./settings/settings.json');
const client = new Client({
	partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
	intents: ['GUILDS', 'GUILD_VOICE_STATES'],
	shards: 'auto',
});

/**
 * @type {Collection<string,
 * {type: ?number,
 * name: string,
 * description:?string,
 * guildOnly: boolean,
 * cooldown: number,
 * options:?[{type: number, name: string, description: string, options:?[{}], required: boolean}],
 * slashcommand: ?Promise,
 * contextmenu: ?Promise,
 * selectmenu: ?Promise,
 * button: ?Promise}>}
 */
const appcommands = new Collection();

// Checks commands, events and the slash folder
const matches = fastGlob.sync('@(commands|events)/**/**.js');

for (const match of matches) {
	/**
     * Example: commands/utility/deploy.js
     * First Value: commands
     * Final Value: deploy.js
     */
	const fileSplit = match.split('/');
	const fileName = fileSplit[fileSplit.length - 1];
	const dirName = fileSplit[0];
	const requiredFile = require('./' + match);

	// For each directory
	switch (dirName) {
	case 'commands':
		console.log(`Loading ApplicationCommand ${fileName}`);

		appcommands.set(requiredFile.name, requiredFile);
		break;

	case 'events':
		console.log(`Loading Event ${fileName}`);
		client.on(requiredFile.name, (...args) => requiredFile.run(...args, appcommands, client));
		break;
	}
}
client.login(token);
