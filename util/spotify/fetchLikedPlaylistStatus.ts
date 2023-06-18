export const fetchfollowPlaylistStatus = async (id: string) => {
  try {
    const res = await fetch(`/api/spotifyLikedPlaylistStatus/${id}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const followSpotifyPlaylist = async (id: string) => {
  try {
    await fetch(`/api/spotifyLikePlaylist/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const unfollowSpotifyPlaylist = async (id: string) => {
  try {
    await fetch(`/api/spotifyUnlikePlaylist/${id}`);
  } catch (err) {
    console.log(err);
  }
};
