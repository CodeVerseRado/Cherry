const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getPlaylist } = require('../utils/playlistManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Show current playlist'),
  async execute(interaction) {
    const playlist = getPlaylist(interaction.guildId);
    if (!playlist.length) return interaction.reply('The playlist is empty.');

    const embed = new EmbedBuilder()
      .setTitle('📃 Playlist')
      .setColor('DarkBlue')
      .setDescription(playlist.map((song, i) => `${i + 1}. [${song.title}](${song.url})`).join('
').slice(0, 4000));

    interaction.reply({ embeds: [embed] });
  },
};
