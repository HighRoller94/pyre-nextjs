import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Artist } from "@/types";
import { Song } from "@/types";

export const fetchSpotifyArtist = async (id: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;

  if (!token) {
    return
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${id}?access_token=${token}`
    );
    const data = await res.json();

    const artistById: Artist = {
      id: data.id,
      name: data.name,
      type: data.type,
      image_path: data.images[0].url,
      follower_count: data.followers.total,
      genres: data.genres,
      spotify_url: true,
      href: `/spotifyArists/${data.id}`
    };

    return artistById;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSpotifyArtistTopTracks = async (id: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  let token = session?.provider_token;

  if (!token) {
    return
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?access_token=${token}&market=US`
    );
    const getTopTracks = await res.json();

    const topTracks: Song[] = getTopTracks.tracks.map((song: any) => ({
      id: song.id,
      user_id: song.album.artists[0].id,
      title: song.name,
      song_path: song.uri,
      author: song.album.artists[0].name,
      image_path: song.album.images[0].url,
      album_name: song.album.name,
      album_id: song.album.id,
      spotify_url: true,
      duration: song.duration_ms
    }));

    return topTracks;
  } catch (err) {
    console.log(err);
  }
}