export const fetchLikeStatus = async (id: string) => {
  try {
    const res = await fetch(`/api/spotifyLikeStatus/${id}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const likeSpotifySong = async (id: string) => {
  try {
    await fetch(`/api/spotifyLike/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const unlikeSpotifySong = async (id: string) => {
  try {
    await fetch(`/api/spotifyUnlike/${id}`);
  } catch (err) {
    console.log(err);
  }
};
