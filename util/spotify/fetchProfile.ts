import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song, Artist, User, Playlist } from "@/types";

var SpotifyWebApi = require("spotify-web-api-node");

export const fetchProfileById = async (id: string) => {
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
      `https://api.spotify.com/v1/users/${id}?access_token=${token}`
    );
    const data = await res.json();

    console.log(data)
    const user: User = {
      id: data.id,
      name: data.display_name,
      image_path: data.images[1].url,
      follower_count: data.followers.total,
      spotify_uri: true,
    };

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const fetchProfilePlaylists = async (id: string) => {
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
      `https://api.spotify.com/v1/users/${id}/playlists?access_token=${token}`
    );
    const userPlaylists = await res.json();

    const playlists: Playlist[] = userPlaylists.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      desc: playlist.description,
      owner_name: playlist.owner.display_name,
      owner_id: playlist.owner.id,
      image_path: playlist.images[0]?.url,
      public: playlist.public,
      track_count: playlist.tracks.total,
      spotify_url: true,
      spotify_uri: playlist.uri,
    }));

    return playlists;
  } catch (err) {
    console.log(err);
  }
};