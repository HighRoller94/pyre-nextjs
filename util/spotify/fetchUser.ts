import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";
import { Artist } from "@/types";

export const userTopArtists = async () => {

  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/top/artists?access_token=${token}`
    );
    const topArtists = await res.json();

    console.log(topArtists);
    // const playedClass: Song[] = getRecentlyPlayed.items.map((song) => ({
    //   id: song.track.id,
    //   user_id: song.track.album.artists[0].id,
    //   title: song.track.name,
    //   song_path: song.track.uri,
    //   author: song.track.album.artists[0].name,
    //   image_path: song.track.album.images[0].url,
    //   spotify_url: true,
    // }));

    // for (let i = 0; i < getRecentlyPlayed.items?.length; i++) {

    // }

    // return playedClass;
  } catch (err) {
    console.log(err);
  }
};

export const userFollowedArtists = async () => {

  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/following?type=artist&limit=20&locale=en-GB,en;q=0.5&access_token=${token}`
    );
    const followingArtists = await res.json();


    const artistRes: Artist[] = followingArtists.artists.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        type: artist.type,
        image_path: artist.images[0].url,
        follower_count: artist.followers.total,
        genres: artist.genres,
        spotify_url: true,
        href: `/spotifyArists/${artist.id}`
    }));

    console.log(artistRes);
    return artistRes;
  } catch (err) {
    console.log(err);
  }
};