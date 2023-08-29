export const fetchSpotifySearchResults = async (id: string) => {
  try {
    const res = await fetch(`/api/spotifySearch/${id}`);
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(`theres been an err: ${err}`);
  }
};
