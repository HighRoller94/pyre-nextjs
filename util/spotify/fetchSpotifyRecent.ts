import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";

const fetchRecentlyPlayed = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;

  if (!token) {
    return;
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?access_token=${token}`
    );
    const getRecentlyPlayed = await res.json();

    const playedClass: Song[] = getRecentlyPlayed.items.map((song: any) => ({
      id: song.track.id,
      user_id: song.track.album.artists[0].id,
      title: song.track.name,
      song_path: song.track.preview_url,
      author: song.track.album.artists[0].name,
      image_path: song.track.album.images[0].url,
      spotify_url: true,
      artists: song.track.artists,
    }));

    const uniqueIds = new Set<any>();

    const uniqueObjects = playedClass.filter((obj) => {
      if (!uniqueIds.has(obj.id)) {
        uniqueIds.add(obj.id);
        return true;
      }
      return false;
    });

    return uniqueObjects;
  } catch (err) {
    console.log(err);
  }
};

export default fetchRecentlyPlayed;
