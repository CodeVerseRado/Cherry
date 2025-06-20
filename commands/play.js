const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const playdl = require('play-dl');
const { addToPlaylist } = require('../utils/playlistManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('🌸 Play a cute song from YouTube or Spotify')
    .addStringOption(option =>
      option.setName('query').setDescription('🎀 YouTube/Spotify link or search').setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString('query');
    await interaction.deferReply();

    let ytInfo = await playdl.search(query, { limit: 1 });
    if (!ytInfo || !ytInfo.length) return interaction.editReply('🩷 No results found.');

    const song = ytInfo[0];
    addToPlaylist(interaction.guildId, song);

    const embed = new EmbedBuilder()
      .setTitle('💖 Now Playing')
      .setDescription(`🌸 [${song.title}](${song.url})`)
      .setThumbnail(song.thumbnails[0].url)
      .setColor('#ff69b4')
      .setFooter({ text: `✨ Duration: ${song.durationRaw}` });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('pause')
        .setLabel('⏸️ Pause')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('skip')
        .setLabel('⏭️ Skip')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('volume_up')
        .setLabel('🔊 +')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('volume_down')
        .setLabel('🔉 -')
        .setStyle(ButtonStyle.Secondary)
    );

    interaction.editReply({ embeds: [embed], components: [row] });
    interaction.client.user.setActivity(`🌸 ${song.title}`, { type: 2 }); // LISTENING
  },
};
