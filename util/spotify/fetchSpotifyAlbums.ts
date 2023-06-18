import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Album } from "@/types";
import { Song } from "@/types";

export const fetchSpotifyArtistAlbums = async (id: string) => {
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
      `https://api.spotify.com/v1/artists/${id}/albums?access_token=${token}`
    );
    const getArtistAlbums = await res.json();

    const artistAlbums: Album[] = getArtistAlbums.items.map((album: any) => ({
      id: album.id,
      name: album.name,
      track_count: album.total_tracks,
      image_path: album.images[0].url,
      release_date: album.release_date,
    }));

    return artistAlbums;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSpotifyAlbum = async (id: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/albums/${id}?access_token=${token}`
    );
    const album = await res.json();

    const albumById: Album = {
      id: album.id,
      name: album.name,
      track_count: album.total_tracks,
      image_path: album.images[0].url,
      release_date: album.release_date,
      songs: album.tracks.items.map((item: any) => {
        const song: Song = {
          id: item.id,
          user_id: item.artists[0].id,
          title: item.name,
          song_path: item.uri,
          author_id: item.artists[0].id,
          author: item.artists[0].name,
          spotify_url: true,
          duration: item.duration_ms,
          artists: item.artists,
        };
        return song;
      }),
    };

    return albumById;
  } catch (err) {
    console.log(err);
  }
};
