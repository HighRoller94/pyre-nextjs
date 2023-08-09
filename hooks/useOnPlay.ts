import { Song } from "@/types";

import usePlayer from "./usePlayer";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();

  const onPlay = (item: Song) => {
    player.setNormalPlayer();
    player.setPlay()
    player.setId(item.id)
    player.setPlaying(item) 
    player.setTracks(songs.map((song) => song));
  }

  return onPlay;
};

export default useOnPlay;