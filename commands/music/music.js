const { Client, Message, MessageEmbed } = require('discord.js')
const { TrackUtils, Player } = require("erela.js");

module.exports = {
    name : 'music',
    category : 'music',
    description : 'Music, why not?',
    usage: '<command [Do XDDmusic help to see commands!]>',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run : async(client, message, args) => {
      const musicCommand = args[0]
      if(!musicCommand) return;
      if(musicCommand === "play") {

        const { channel } = message.member.voice;

    if (!channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel first!`);
    if (!args.slice(1).join(" ")) return message.channel.send(`[${client.emoji.error}] You must specify a URL or a Search term to play it!`);
    

    const player = message.client.music.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
    });

    if (player.state !== "CONNECTED") player.connect();

    const search = args.slice(1).join(' ');
         try {
     if (search.match(client.Lavasfy.spotifyPattern)) {
                await client.Lavasfy.requestToken();
                let node = client.Lavasfy.nodes.get(client.config.music.lavalink.node.id);
                let Searched = await node.load(search);

                if (Searched.loadType === "PLAYLIST_LOADED") {
                    let songs = [];
                    for (let i = 0; i < Searched.tracks.length; i++) songs.push(TrackUtils.build(Searched.tracks[i], message.author));
                 
                 player.queue.add(songs);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
        return message.channel.send(`[${client.emoji.success}] Added \`${Searched.tracks[0].title}\` to queue.`);
                } else if (Searched.loadType.startsWith("TRACK")) {
                    player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));
                    if (!player.playing && !player.paused && !player.queue.size) player.play();
                    let dmm = await message.channel.send(`[${client.emoji.success}] Added \`${Searched.tracks[0].title}\` to queue.`)
                    //SongAddedEmbed.addField("Duration", `\`${prettyMilliseconds(Searched.tracks[0].length, { colonNotation: true })}\``, true);
                    if (player.queue.totalSize > 1) dmm.edit(`[${client.emoji.success}] Added \`${Searched.tracks[0].title}\` to queue. Position in queue: ${player.queue.size - 0}`);
                } else {
                    return message.channel.send(`[${client.emoji.error}] There are no results in your search!`);
                }
           
                
     } else if (!search.match("https://open.spotify.com/track/")){
       let res = await player.search(search, message.author);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.channel.send(`[${client.emoji.error}] There are no results in your search!`);
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
        return message.channel.send(`[${client.emoji.success}] Added \`${res.tracks[0].title}\` to queue.`);
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);

        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
        return message.channel.send(`[${client.emoji.success}] Added playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks to queue.`);
      case 'SEARCH_RESULT':

       
        const track = res.tracks[0];
        player.queue.add(track);

        


     if (!player.playing && !player.paused && !player.queue.size) player.play();
        return message.channel.send(`[${client.emoji.success}] Added \`${track.title}\` to queue.`);
             }
     }
    } catch (err) {
      return message.channel.send(`[${client.emoji.error}] An error occured while searching! Error: ${err}`);
    }
      } else if (musicCommand === "stop") {
         const player = client.music.get(message.guild.id);
    if (!player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);

    const { channel } = message.member.voice;
    
    if (!channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel first!`);
    if (channel.id !== player.voiceChannel) return message.channel.send(`[${client.emoji.error}] You are not in the same voice channel as me!`);
    
    player.destroy();
    return message.channel.send(`[${client.emoji.success}] Stopped the queue!`);
      } else if (musicCommand === "volume") {
        const player = client.music.get(message.guild.id);

    if (!player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);
    if (!args.slice(1).length) return message.channel.send(`[${client.emoji.music}] The music volume is \`${player.volume}\`.`)

    const { channel } = message.member.voice;
    
    if (!channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel first!`);
    if (channel.id !== player.voiceChannel) return message.channel.send(`[${client.emoji.error}] You are not in the same voice channel as me!`);

    const volume = Number(args[1]);
    
    if (!volume || volume < 1 || volume > 100) return message.channel.send(`[${client.emoji.error}] You must provide a number between 1-100 to set the volume! (Please dont set it 50-100 volume or you ears will die!)`);

    player.setVolume(volume);
    return message.channel.send(`[${client.emoji.success}] Set the music volume to \`${volume}\`.`);
      } else if (musicCommand === "bassboost") {
        const levels = {
    none: 0.0,
    low: 0.2,
    medium: 0.3,
    high: 0.35,
};
let player = await client.music.get(message.guild.id);
        if (!player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);
        if (!message.member.voice.channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel to use this command!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[${client.emoji.error}] You must be in the same voice channel as me to use this command!`);

        if (!args[0]) return message.channel.send(`[${client.emoji.error}] Please provide a bassboost level. \nAvailable Levels: \`none\`, \`low\`, \`medium\`, \`high\``); 

        let level = "none";
        if (args.length && args[1].toLowerCase() in levels) level = args[1].toLowerCase();

        player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

        message.channel.send(`[${client.emoji.success}] Bassboost level set to \`${level}\``);
      } else if (musicCommand === "lyrics") {
        const lyricsFinder = require("lyrics-finder");
        const _ = require("lodash");
        const { pagination } = require('reconlx')
        let player = await client.music.get(message.guild.id);
    let SongTitle = args.slice(1).join(" ");
    let SearchString = args.slice(1).join(" ");
    if (!args[1] && !player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);
    if (!args[1]) SongTitle = player.queue.current.title;

    let lyrics = await lyricsFinder(SongTitle);
    if (!lyrics) return message.channel.send(`[${client.emoji.error}] No lyrics found for - \`${SongTitle}\``);
    lyrics = lyrics.split("\n"); //spliting into lines
    let SplitedLyrics = _.chunk(lyrics, 40); //45 lines each page

    let Pages = SplitedLyrics.map((ly) => {
      let em = new MessageEmbed()
        .setAuthor(`Lyrics for: ${SongTitle}`, client.user.displayAvatarURL({ dynamic: false, size: 128 }))
        .setColor("GREEN")
        .setDescription(ly.join("\n"))
        .setFooter(`Page 1 of 1`)
        .setTimestamp();

      if (args.slice(1).join(" ") !== SongTitle) em.setThumbnail(player.queue.current.displayThumbnail());

      return em;
    });

    if (!Pages.length || Pages.length === 1) return message.channel.send({embeds: [Pages[0]]});
    else return pagination({
        message: message,
        pages: Pages
      })
      } else if (musicCommand === "youtube") {
         if (!message.member.voice.channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel to play something!`);
        if(!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE"))return message.channel.send(`[${client.emoji.error}] I don't have Create Invite Permission`);

        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
        let embed = new MessageEmbed()
        .setAuthor("YouTube Together", "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1")
        .setColor("#FF0000")
        .setDescription(`
Using **YouTube Together** you can watch YouTube with your friends in a Voice Channel. Click *Join YouTube Together* to join in!

__**[Join YouTube Together](${invite.code})**__

⚠ **Note:** This only works in Desktop
`)
        message.channel.send({embeds: [embed]})
    });
       
      } else if (musicCommand === "pause") {
       let player = await client.music.get(message.guild.id);
        if (!player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);
        if (!message.member.voice.channel) return message.channel.send(`[${client.emoji.error}] You need to be in a voice channel first!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[${client.emoji.error}] You must be in the same voice channel as me!`)
        if (player.paused) return message.channel.send(`[${client.emoji.error}] Music is already paused!`)
        player.pause(true);
        let embed = new MessageEmbed().setAuthor(`Paused!`).setColor("GREEN").setDescription(`Type \`XDDresume\` to continue playing!`);
        await message.channel.send({
          embeds: [embed]
        });
      } else if (musicCommand === "resume") {
        let player = await client.music.get(message.guild.id);
        if (!player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);
        if (!message.member.voice.channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel to use this command!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[${client.emoji.error}] You must be in the same voice channel as me to use this command!`);

        if (player.playing) return message.channel.send(`[${client.emoji.error}] Music is already resumed!`);
        player.pause(false);

      } else if (musicCommand === "skip") {
        let player = await client.music.get(message.guild.id);
        if (!player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);
        if (!message.member.voice.channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel to use this command!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[${client.emoji.error}] You must be in the same voice channel as me to use this command!`);

        player.stop();
      } else if (musicCommand === "queue") {
        const _ = require("lodash");
const prettyMilliseconds = require("pretty-ms");

                const { pagination } = require('reconlx')
        let player = await client.music.get(message.guild.id);
    if (!player)
      return message.channel.send(`[${client.emoji.error}] Nothing is playing now...`)

    if (!player.queue || !player.queue.length || player.queue === 0) {
      let QueueEmbed = new MessageEmbed()
        .setAuthor("Currently playing", client.user.displayAvatarURL({ dynamic: false }))
        .setColor("GREEN")
        .setDescription(
          `[${player.queue.current.title}](${player.queue.current.uri})`
        )
        .addField("Requested by", `${player.queue.current.requester}`, true)
        .addField(
          "Duration",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`[${prettyMilliseconds(player.position, {
            colonNotation: true,
          })} / ${prettyMilliseconds(player.queue.current.duration, {
            colonNotation: true,
          })}]\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());
      return message.channel.send({embeds: [QueueEmbed]});
    }

    let Songs = player.queue.map((t, index) => {
      t.index = index;
      return t;
    });

    let ChunkedSongs = _.chunk(Songs, 10); //How many songs to show per-page

    let Pages = ChunkedSongs.map((Tracks) => {
      let SongsDescription = Tracks.map(
        (t) =>
          `\`${t.index + 1}.\` [${t.title}](${t.uri}) \n\`${prettyMilliseconds(
            t.duration,
            {
              colonNotation: true,
            }
          )}\` **|** Requested by: ${t.requester}\n`
      ).join("\n");

      let Embed = new MessageEmbed()
        .setAuthor("Queue", client.botconfig.IconURL)
        .setColor("GREEN")
        .setDescription(
          `**Currently Playing:** \n[${player.queue.current.title}](${player.queue.current.uri}) \n\n**Up Next:** \n${SongsDescription}\n\n`
        )
        .addField("Total songs: \n", `\`${player.queue.totalSize - 1}\``, true)
        .addField(
          "Total length: \n",
          `\`${prettyMilliseconds(player.queue.duration, {
            colonNotation: true,
          })}\``,
          true
        )
        .addField("Requested by:", `${player.queue.current.requester}`, true)
        .addField(
          "Current song duration:",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`${prettyMilliseconds(player.position, {
            colonNotation: true,
          })} / ${prettyMilliseconds(player.queue.current.duration, {
            colonNotation: true,
          })}\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());

      return Embed;
    });

    if (!Pages.length || Pages.length === 1)
      return message.channel.send(Pages[0]);
    else pagination({
        message: message,
        pages: Pages
      })
      } else if (musicCommand === "nowplaying") {

      } else if (musicCommand === "loop") {
       let player = await client.music.get(message.guild.id);
        if (!player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);
        if (!message.member.voice.channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel to use this command!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[${client.emoji.error}] You must be in the same voice channel as me to use this command!`);

        if (player.trackRepeat) {
          player.setTrackRepeat(false)
          message.channel.send(`[${client.emoji.success}] Disabled loop!`)
        } else {
          player.setTrackRepeat(true)
          message.channel.send(`[${client.emoji.success}] Enabled loop!`)
        }

      } else if (musicCommand === "loopqueue") {
        let player = await client.music.get(message.guild.id);
        if (!player) return message.channel.send(`[${client.emoji.error}] Nothing is playing right now...`);
        if (!message.member.voice.channel) return message.channel.send(`[${client.emoji.error}] You must be in a voice channel to use this command!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[${client.emoji.error}] You must be in the same voice channel as me to use this command!`);

        if (player.queueRepeat) {
          player.setQueueRepeat(false)
          message.channel.send(`[${client.emoji.success}] Disabled queue loop!`)
        } else {
          player.setQueueRepeat(true)
          message.channel.send(`[${client.emoji.success}] Enabled queue loop!`)
        }

      } else if(musicCommand === "help") {
        let embed = new MessageEmbed().setColor(client.musicColor).setTitle(`${client.user.tag} music commands help!`).setDescription("```\nHelp, Play, Stop, Volume, Bassboost, Lyrics, Youtube, Pause, Resume, Skip, Queue, Nowplaying, Loop, Loopqueue\n```").setFooter("Note: You cant use XDDmusic help (command name) because sadly we cant provide informations of these commands!")
      }
    }
}