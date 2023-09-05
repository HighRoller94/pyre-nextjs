"use client";

import { useState } from "react";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSong from "@/hooks/useGetSong";
import useGetSpotifyDeviceId from "@/hooks/useGetSpotifyDeviceId";
import PlayerContent from "./PlayerContent";

import { Song } from "@/types";

interface PlayerProps {
  status?: string;
  devices?: [];
}

const Player: React.FC<PlayerProps> = ({ status, devices }) => {
  const player = usePlayer();
  const trackPlaying = player.playing || undefined;
  const [miniPlayer, setMiniPlayer] = useState(false);

  const togglePlayer = () => {
    setMiniPlayer(!miniPlayer);
  };

  // const { song } = useGetSong(trackPlaying, status);

  const songUrl = useLoadSongUrl(trackPlaying);

  if (!trackPlaying || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className={`
      fixed 
      bg-neutral-950 
      py-2 
      z-50
      h-[90px] 
      border-t-2
      border-neutral-800
      px-4
      ${miniPlayer ? "w-4/12 right-2 bottom-2 rounded-lg" : "w-full bottom-0 "}
      `}
    >
      <PlayerContent
        miniPlayer={miniPlayer}
        togglePlayer={togglePlayer}
        key={songUrl}
        song={trackPlaying}
        songUrl={songUrl}
      />
    </div>
  );
};

export default Player;
