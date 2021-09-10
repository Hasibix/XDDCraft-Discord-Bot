const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const { Client, Message, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'music',
    category : 'music',
    aliases : [''],
    description : 'music command owo',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      const musicCommand = args[0]
    if(!musicCommand) return;
     if(musicCommand === "play") {
           const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(
        "I cannot connect to your voice channel, make sure I have the proper permissions!"
      );
    if (!permissions.has("SPEAK"))
      return message.channel.send(
        "I cannot speak in this voice channel, make sure I have the proper permissions!"
      );
    const youtube = new YouTube(client.secrets.api);
    var searchString = args.slice(1).join(" ");
    if (!searchString)
      return message.channel.send("You didn't poivide want i want to play");
    const serverQueue = message.client.queue.get(message.guild.id);
    var videos = await youtube.searchVideos(searchString).catch(console.log);
    var songInfo = await videos[0].fetch().catch(console.log);

    const song = {
      id: songInfo.video_id,
      title: Util.escapeMarkdown(songInfo.title),
      url: songInfo.url,
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      return message.channel.send(
        `✅ **${song.title}** has been added to the queue!`
      );
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true,
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      queue.textChannel.send(`🎶 Start playing: **${song.title}**`);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(
        `I could not join the voice channel: ${error}`
      );
    }
     } else if (musicCommand === "stop") {
         const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing that I could stop for you."
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop command has been used!");
     } else if (musicCommand === "skip") {
        const { channel } = message.member.voice;
  if (!channel)
    return message.channel.send(
      "I'm sorry but you need to be in a voice channel to play music!"
    );
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue)
    return message.channel.send(
      "There is nothing playing that I could skip for you."
    );
  serverQueue.connection.dispatcher.end("Skip command has been used!");
     } else if (musicCommand === "volume") {
          const { channel } = message.member.voice;
  if (!channel)
    return message.channel.send(
      "I'm sorry but you need to be in a voice channel to play music!"
    );
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  if (!args[1])
    return message.channel.send(
      `The current volume is: **${serverQueue.volume}**`
    );
  serverQueue.volume = args[1]; 
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
  return message.channel.send(`I set the volume to: **${args[1]}**`);
     } else if (musicCommand === "pause") {
         const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return message.channel.send("⏸ Paused the music for you!");
  }
  return message.channel.send("There is nothing playing.");
     } else if (musicCommand === "resume") {
         const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.channel.send("▶ Resumed the music for you!");
  }
  return message.channel.send("There is nothing playing.");
     } else if (musicCommand === "queue") {
         const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map((song) => `**-** ${song.title}`).join("\n")}
**Now playing:** ${serverQueue.songs[1].title}
		`);
     } else if (musicCommand === "np") {
         const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  return message.channel.send(
    `🎶 Now playing: **${serverQueue.songs[1].title}**`
  );
     } else if (musicCommand === "nowplaying") {
         const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  return message.channel.send(
    `🎶 Now playing: **${serverQueue.songs[1].title}**`
  );
     } else if (musicCommand === "lyrics") {
       
     }
    }
}