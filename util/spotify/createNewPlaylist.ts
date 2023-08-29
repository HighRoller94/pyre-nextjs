export const createSpotifyPlaylist = async () => {
  try {
    const res = await fetch(`/api/spotifyCreatePlaylist`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`theres been an err: ${err}`);
  }
};
