export const playSpotify = async () => {
  try {
    const res = await fetch(
      `/api/spotifyPlay`
    );
   await res.json();
  } catch (err) {
    console.log(err);
  }
};


export const pauseSpotify = async () => {
  try {
    const res = await fetch(
      `/api/spotifyPause`
    );
   await res.json();
  } catch (err) {
    console.log(err);
  }
};


export const getSpotifyDevices = async () => {
  try {
    const res = await fetch(
      `/api/spotifyDevices`
    );
    return res.json();
  } catch (err) {
    console.log(err)
  }
}