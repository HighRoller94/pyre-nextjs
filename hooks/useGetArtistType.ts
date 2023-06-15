"use client"

import { Song } from "@/types";

const useGetArtist = (song: Song) => {
  if (!song) {
    return null;
  }

  if (song.spotify_url) {
    return `/spotify/artist`;
  } else {
    return `/artist`;
  }
};

export default useGetArtist;
