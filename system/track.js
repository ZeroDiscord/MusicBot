const audio = require('@discordjs/voice');
const ytdl = require('youtube-dl-exec');
const noop = () => { }; // eslint-disable-line no-empty-function
/**
 * Represent the song track!
 */
class Track {
	/**
   * @param {Object} constructor - Represent constructor object
   * @param {string} constructor.url -youtube video url | SoundCloud url | Others
   * @param {string} constructor.title -track title
   * @param {Function} constructor.onStart -process onStart
   * @param {Function} constructor.onFinish -process onFinish
   * @param {Function} constructor.onError -process onError
   */
	constructor({ url, title, onStart, onFinish, onError }) {
		this.url = url;
		this.title = title;
		this.onStart = onStart;
		this.onFinish = onFinish;
		this.onError = onError;
	}
	/**
     * Creates an AudioResource from this Track.
     * @returns {Promise<audio.AudioResource<Track>>} audio resource
     */
	createAudioResource() {
		return new Promise((resolve, reject) => {
			const process = ytdl.raw(this.url, {
				o: '-',
				q: '',
				f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/best',
				r: '100K',
			}, { stdio:['ignore', 'pipe', 'ignore'] });
			if (!process.stdio) {
				reject(new Error('No readable stream'));
				return;
			}
			const stream = process.stdout;
			const onError = (
				/** @type {any} */
				error) => {
				if (!process.killed) {process.kill();}
				stream.resume();
				reject(error);
			};
			process
				.on('spawn', () => {
					audio.demuxProbe(stream)
						.then((probe) => resolve(audio.createAudioResource(probe.stream, { metadata: this, inputType: probe.type })))
						.catch(onError);
				});
		});
	}
	/**
	 * Creates a Track from a video URL and lifecycle callback methods.
	 * @param {string} url The URL of the video
	 * @returns The created Track
	 * @param {string} title
	 * @param {{ onStart: Function; onFinish: Function; onError: Function; }} methods
	 */
	static async from(url, title, methods) {

		// The methods are wrapped so that we can ensure that they are only called once.
		const wrappedMethods = {
			onStart() {
				wrappedMethods.onStart = noop;
				methods.onStart();
			},
			onFinish() {
				wrappedMethods.onFinish = noop;
				methods.onFinish();
			},
			/**
			 * @param {any} error
			 */
			onError(error) {
				wrappedMethods.onError = noop;
				methods.onError(error);
			},
		};
		return new Track({
			title,
			url,
			...wrappedMethods,
		});
	}
}
exports.Track = Track;
