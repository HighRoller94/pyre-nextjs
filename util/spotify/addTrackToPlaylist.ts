export const addTrackToPlaylist = async (id: string, uri: string) => {
  try {
    await fetch(`/api/spotifyAddToPlaylist`, {
      method: 'POST',
      body: JSON.stringify({ playlistId: id, spotifyUri: uri})
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeSpotifySongFromPlaylist = async (id: string) => {
  try {
    await fetch(`/api/spotifyUnlike/${id}`);
  } catch (err) {
    console.log(err);
  }
};
