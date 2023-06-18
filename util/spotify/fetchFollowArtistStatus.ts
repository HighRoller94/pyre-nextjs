export const fetchfollowArtistStatus = async (id: string) => {
  try {
    const res = await fetch(`/api/spotifyFollowArtistStatus/${id}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const followSpotifyArtist = async (id: string) => {
  try {
    await fetch(`/api/spotifyFollowArtist/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const unfollowSpotifyArtist = async (id: string) => {
  try {
    await fetch(`/api/spotifyUnfollowArtist/${id}`);
  } catch (err) {
    console.log(err);
  }
};
