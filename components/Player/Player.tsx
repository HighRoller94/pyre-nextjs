"use client";

import { useEffect, useState } from "react";
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
  const trackPlaying = player.playing || undefined

  const { song } = useGetSong(trackPlaying, status);
  
  const songUrl = useLoadSongUrl(trackPlaying);

  console.log(`player id is ${player.activeId}`)
  console.log(`player url is ${songUrl}`)
  console.log(`playing song is ${trackPlaying}`)
  console.log(`player song is ${trackPlaying?.title}`)

  if (!trackPlaying || !songUrl || !player.activeId) {
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
      <PlayerContent key={songUrl} song={trackPlaying} songUrl={songUrl} />
    </div>
  );
};

export default Player;
