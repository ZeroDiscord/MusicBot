const { Constants, MessageButton, Message } = require('discord.js');
const { Track } = require('../../system/track');
const type = Constants.ApplicationCommandTypes;
const delay = require('timers/promises').setTimeout;
module.exports = {
	name: 'Music Msg',
	type: type.MESSAGE,
	guildOnly: false,
	/**
    * @param {import('discord.js').ContextMenuInteraction} interaction - Represent contextmenu interaction
	* @param {import('discord.js').Collection} _appcommands
	* @param {import('discord.js').Collection<string, import('../../system/playlist').Playlist>} playlist
   	*/
	async contextmenu(interaction, _appcommands, playlist) {
		try{
			await interaction.deferReply({ ephemeral: true });
			const message = interaction.options.getMessage('message');
			const list = playlist.get(interaction.guild.id);
			const resume = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_resume`,
				emoji: '▶️',
				label: 'Resume',
			});
			const pause = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_pause`,
				emoji: '⏸️',
				label: 'Pause',
			});
			const skip = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_skip`,
				emoji: '⏭️',
				label: 'Skip',
			});
			const leave = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_leave`,
				emoji: '🛑',
				label: 'Leave',
			});
			const queue = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_queue`,
				emoji: '📼',
				label: 'Queue',
			});
			if (message instanceof Message && message.author.id === interaction.guild.me.id) {
				if (list) {
					let current = '';
					if(list.audioPlayer.state.status === 'idle') {
						current = 'Nothing is currently playing!';
					}
					else if(list.audioPlayer.state.status === 'playing' && list.audioPlayer.state.resource.metadata instanceof Track) {
						current = `Currently playing **${list.audioPlayer.state.resource.metadata.title}**`;
					}
					const q = list.queue
						.slice(0, 10)
						.map((track, index) => `${index + 1}) ${track.title}`)
						.join('\n');
					return interaction.editReply({ content: `${current}\n${q}`, components:[{ type: 'ACTION_ROW', components:[resume, pause, skip, queue, leave] }] });
				}
				else {
					return interaction.editReply({ content: 'Not playing in this server!', components:[{ type: 'ACTION_ROW', components:[resume, pause, skip, queue, leave] }] });
				}
			}
			else {
				return interaction.editReply({ content:'Not pointing at me!' });
			}
		}
		catch(error) {
			console.warn(error);
			return interaction.editReply({ content: 'Something is wrong with the ContextMenu Interaction Command!' });
		}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction - Represent button interaction
	* @param {import('discord.js').Collection} _appcommands
	* @param {import('discord.js').Collection<string, import('../../system/playlist').Playlist>} playlist
   	*/
	async button(interaction, _appcommands, playlist) {
		try {
			const list = playlist.get(interaction.guild.id);
			if (interaction.customId === `${this.name}_resume`) {
				(list) ?
					(list.audioPlayer.unpause(),
					interaction.update({ content: 'Resuming!' }))
					:	interaction.update({ content:'Not playing in this server!' });
			}
			else if (interaction.customId === `${this.name}_pause`) {
				(list) ?
					(list.audioPlayer.pause(),
					interaction.update({ content: 'Paused!' }))
					:	interaction.update({ content:'Not playing in this server!' });
			}
			else if (interaction.customId === `${this.name}_skip`) {
				(list) ?
					(list.audioPlayer.stop(),
					interaction.update({ content: 'Skipped!' }))
					: interaction.update({ content:'Not playing in this server!' });
			}
			else if (interaction.customId === `${this.name}_leave`) {
				(list) ?
					(await interaction.update({ content: 'Leaving channel in 2 sec!' }),
					await delay(2 * 1000),
					list.voiceConnection.destroy(true),
					playlist.delete(interaction.guildId))
					: interaction.update({ content:'Not playing in this server' });
			}
			else if (interaction.customId === `${this.name}_queue`) {
				if (list) {
					let current = '';
					if(list.audioPlayer.state.status === 'idle') {
						current = 'Nothing is currently playing!';
					}
					else if (list.audioPlayer.state.status === 'playing' && list.audioPlayer.state.resource.metadata instanceof Track) {
						current = `Currently playing **${list.audioPlayer.state.resource.metadata.title}**`;
					}
					const q = list.queue
						.slice(0, 10)
						.map((track, index) => `${index + 1}) ${track.title}`)
						.join('\n');
					return interaction.update({ content: `${current}\n${q}` });
				}
				else {
					return interaction.update({ content: 'Not playing in this server!' });
				}
			}
		}
		catch (error) {
			console.warn(error);
			return interaction.update({ content: 'Something is wrong with the Button Interaction Command!' });
		}
	},
};