"use client"

import { Song } from "@/types";

const useGetArtist = (spotifyUrl?: boolean) => {
  if (!spotifyUrl) {
    return null;
  }

  if (spotifyUrl) {
    return `/spotify/artist`;
  } else {
    return `/artist`;
  }
};

export default useGetArtist;
