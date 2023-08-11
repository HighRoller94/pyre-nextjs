export const fetchSpotifySavedStatus = async (ids: string) => {
  try {
    const res = await fetch(`/api/spotifySavedTrackStatus/${ids}`);
    const data = await res.json()
    return data;

  } catch (err) {
    console.log(`theres been an err: ${err}`);
  }
};
