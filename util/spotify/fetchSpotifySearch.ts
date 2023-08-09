import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";
import { Artist } from "@/types";
import SpotifyWebApi from "spotify-web-api-node";

export const fetchSpotifySearchTracks = async (query: any) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  var spotifyApi = new SpotifyWebApi();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;

  if (!token) {
    return;
  }

  try {
    spotifyApi.setAccessToken(token);
    const data = await spotifyApi.searchTracks(`${query}`);

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
        artists: song.artists,
      })) ?? [];

    return searchRes;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSpotifySearchArtists = async (query: any) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  var spotifyApi = new SpotifyWebApi();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;

  if (!token) {
    return;
  }

  try {
    spotifyApi.setAccessToken(token);
    const data = await spotifyApi.searchArtists(`${query}`);
    const searchArtists = data.body.artists?.items;

    const artistRes: Artist[] = searchArtists?.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      type: artist.type,
      image_path: artist.images[0].url,
      follower_count: artist.followers.total,
      genres: artist.genres,
      spotify_url: true,
      href: `/spotifyArtists/${artist.id}`,
    })) ?? [];

    return artistRes;
  } catch (err) {
    console.log(err);
  }
};
