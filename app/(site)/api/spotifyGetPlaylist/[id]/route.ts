import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Playlist } from "@/types";
import { Song } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: any) {
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

  let id = context.params.id;

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${id}?access_token=${token}`
    );
    const playlist = await res.json();

    const playlistById: Playlist = {
      id: playlist.id,
      name: playlist.name,
      desc: playlist.description,
      owner_name: playlist.owner.display_name,
      owner_id: playlist.owner.id,
      image_path: playlist.images[0]?.url || "",
      public: playlist.public,
      track_count: playlist.tracks.total,
      tracks: [],
      spotify_url: true,
      spotify_uri: playlist.uri,
    };

    if (playlist.tracks.total > 1) {
      playlistById.tracks = playlist.tracks.items.map((track: any) => {
        const song: Song = {
          id: track.track.id,
          album_id: track.track.album.id,
          user_id: track.track.artists[0].id,
          author: track.track.artists[0].name,
          image_path: track.track.album.images[0]?.url,
          title: track.track.name,
          song_path: track.track.preview_url,
          artists: track.track.artists,
          author_id: track.track.artists[0].id,
          spotify_url: true,
          spotify_uri: track.track.uri,
          duration: track.track.duration_ms,
          album_name: track.track.album.name,
        };
        return song;
      });
    }

    return new Response(JSON.stringify({ playlistById }));
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
