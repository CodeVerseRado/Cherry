const playlists = new Map();

function addToPlaylist(guildId, song) {
  if (!playlists.has(guildId)) playlists.set(guildId, []);
  playlists.get(guildId).push(song);
}

function getPlaylist(guildId) {
  return playlists.get(guildId) || [];
}

function clearPlaylist(guildId) {
  playlists.set(guildId, []);
}

module.exports = { addToPlaylist, getPlaylist, clearPlaylist };
