export const fetchfollowUserStatus = async (id: string) => {
  try {
    const res = await fetch(`/api/spotifyUserStatus/${id}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const followSpotifyUser = async (id: string) => {
  try {
    await fetch(`/api/spotifyFollowUser/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const unfollowSpotifyUser = async (id: string) => {
  try {
    await fetch(`/api/spotifyUnfollowUser/${id}`);
  } catch (err) {
    console.log(err);
  }
};
