const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config();

module.exports = (client) => {
  client.once('ready', () => {
    console.log(`🤖 Logged in as ${client.user.tag}`);

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const channel = guild?.channels.cache.get(process.env.VC_ID);

    if (channel && channel.isVoiceBased()) {
      joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false,
      });
      console.log('🎶 24/7 Voice Connected');
    }
  });
};
