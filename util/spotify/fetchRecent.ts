import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";
import { get } from "http";

const fetchRecentlyPlayed = async () => {
  let uniquePlays: object[];
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  let token = session?.provider_token;

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?access_token=${token}`
    );
    const getRecentlyPlayed = await res.json();

    console.log(getRecentlyPlayed.track)

    const playedClass: Song[] = getRecentlyPlayed.items.map((song) => ({
      id: song.track.id,
      user_id: song.track.album.artists[0].id,
      title: song.track.name,
      song_path: song.track.uri,
      author: song.track.album.artists[0].name,
      image_path: song.track.album.images[0].url,
      spotify_url: true,
    }));

    for (let i = 0; i < getRecentlyPlayed.items?.length; i++) {
      console.log(getRecentlyPlayed.items[0].track)
    }

    return playedClass;
  } catch (err) {
    console.log(err);
  }
};

export default fetchRecentlyPlayed;
