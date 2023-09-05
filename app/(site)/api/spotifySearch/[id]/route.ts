import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";
import { Artist } from "@/types";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(request: Request, context: any) {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  var spotifyApi = new SpotifyWebApi();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;
  let queryString = context.params.id;

  if (!token) {
    return;
  }

  try {
    spotifyApi.setAccessToken(token);
    const data = await spotifyApi.searchTracks(queryString, { limit: 6 });
    const searchTracks = data.body.tracks?.items;

    const searchRes: Song[] =
      searchTracks?.map((song: any) => ({
        id: song.id,
        user_id: song.album.artists[0].id,
        title: song.name,
        song_path: song.preview_url,
        author: song.album.artists[0].name,
        image_path: song.album.images[0].url,
        album_name: song.album.name,
        album_id: song.album.id,
        spotify_url: true,
        duration: song.duration_ms,
        spotify_uri: song.uri,
        artists: song.artists,
      })) ?? [];

    return new Response(JSON.stringify({ searchRes }));
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
