import { Song } from "@/types";

const useGetArtist = (song: Song) => {
  if (!song) {
    return null;
  }
  console.log(song);
  if (song.spotify_url) {
    return `/spotifyArtists/${song.id}`;
  } else {
    return `/artists/${song.id}`;
  }
};

export default useGetArtist;
