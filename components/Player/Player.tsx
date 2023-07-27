"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSong from "@/hooks/useGetSong";

import PlayerContent from "./PlayerContent";

import { Song } from "@/types";

interface PlayerProps {
  status?: string;
  devices?: [];
}

const Player: React.FC<PlayerProps> = ({ status, devices }) => {
  const player = usePlayer();

  const trackPlaying = player.playing;
  const { song } = useGetSong(trackPlaying, status);
  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[80px] 
        px-4
      "
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
