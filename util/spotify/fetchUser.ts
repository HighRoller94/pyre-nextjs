import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";
import { Artist } from "@/types";
import { Playlist } from "@/types";
import SpotifyWebApi from "spotify-web-api-node";
var spotifyApi = new SpotifyWebApi();

export const fetchUserById = async (id: string) => {
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
      `https://api.spotify.com/v1/me?access_token=${token}`
    );
    const data = await res.json();

    return data.product;
  } catch (err) {
    console.log(err);
  }
};

export const userTopArtists = async () => {
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
    const data = await spotifyApi.getMyTopArtists();
    const topArtists = data.body.items;

    const artistRes: Artist[] = topArtists.map(
      (artist: any) => ({
        id: artist.id,
        name: artist.name,
        type: artist.type,
        image_path: artist.images[0].url,
        follower_count: artist.followers.total,
        genres: artist.genres,
        spotify_url: true,
        href: `/spotifyArtists/${artist.id}`,
      })
    );

    return artistRes;
  } catch (err) {
    console.log(err);
  }
};

export const userTopTracks = async () => {
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
    const data = await spotifyApi.getMyTopTracks();
    const topTracks = data.body.items;
    const tracksRes: Song[] = topTracks.map((song: any) => ({
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


    return tracksRes;
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

  if (!token) {
    return;
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/following?type=artist&limit=20&locale=en-GB,en;q=0.5&access_token=${token}`
    );
    const followingArtists = await res.json();

    const artistRes: Artist[] = followingArtists.artists.items.map(
      (artist: any) => ({
        id: artist.id,
        name: artist.name,
        type: artist.type,
        image_path: artist.images[0].url,
        follower_count: artist.followers.total,
        genres: artist.genres,
        spotify_url: true,
        href: `/spotifyArtists/${artist.id}`,
      })
    );

    return artistRes;
  } catch (err) {
    console.log(err);
  }
};

export const userPlayLists = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;
  let userName = session?.user.user_metadata?.name;

  if (!token) {
    return;
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/users/${userName}/playlists?access_token=${token}`
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

export const fetchUserDevices = async () => {
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
      `https://api.spotify.com/v1/me/player/devices?access_token=${token}`
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserLikedSongs = async () => {
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
      `https://api.spotify.com/v1/me/tracks?access_token=${token}`
    );
    const data = await res.json();
    const likedSpotifySongs: Song[] = data.items.map((song: any) => ({
      id: song.track.id,
      user_id: song.track.artists[0].id,
      image_path: song.track.album.images[0].url,
      title: song.track.name,
      song_path: song.track.uri,
      author_id: song.track.artists[0].id,
      author: song.track.artists[0].name,
      spotify_url: true,
      duration: song.track.duration_ms,
      artists: song.track.artists,
    }));

    return likedSpotifySongs;
  } catch (err) {
    console.log(err);
  }
};
