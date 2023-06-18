import { Song } from "@/types";

const fetchSpotifySongById = async (id: string, status: string) => {
  const res = await fetch(`/api/spotify`);
  const token = await res.json();
console.log(token)
  if (!token) {
    return
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/tracks/${id}?access_token=${token.token}`
    );
    const data = await res.json();
    
    const songById: Song = {
      id: data.id,
      user_id: data.artists[0].id,
      author: data.artists[0].name,
      title: data.name,
      album_id: data.album.id,
      song_path: data.preview_url,
      image_path: data.album.images[0].url,
      spotify_url: true,
      duration: data.duration_ms
    };
    

    const fullSongById: Song = {
      id: data.id,
      user_id: data.artists[0].id,
      album_id: data.album.id,
      author: data.artists[0].name,
      title: data.name,
      song_path: data.uri,
      image_path: data.album.images[0].url,
      spotify_url: true,
      duration: data.duration_ms
    };

    // if (status == 'premium') {
    //   return fullSongById;
    // } else {
    //   return songById;
    // }

    return songById;

  } catch (err) {
    console.log(err);
  }
};

export default fetchSpotifySongById;
