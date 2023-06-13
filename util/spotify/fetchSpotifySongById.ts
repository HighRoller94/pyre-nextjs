import { Song } from "@/types";

const fetchSpotifySongById = async (id: string) => {
  const res = await fetch(`/api/spotify`);
  const token = await res.json();

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/tracks/${id}?access_token=${token.token}`
    );
    const data = await res.json();

    console.log(data)
    const songById: Song = {
      id: data.id,
      user_id: data.artists[0].id,
      author: data.artists[0].name,
      title: data.name,
      song_path: data.preview_url,
      image_path: data.album.images[0].url,
      spotify_url: true,
    };

    // for (let i = 0; i < getRecentlyPlayed.items?.length; i++) {
    // }

    return songById;
  } catch (err) {
    console.log(err);
  }
};

export default fetchSpotifySongById;
