"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";
import useGetSpotifyDeviceId from "@/hooks/useGetSpotifyDeviceId";
import PlayerContent from "./PlayerContent";
import useSpotify from "@/hooks/useSpotify";

interface PlayerProps {
  status: string;
  devices: [];
}

const Player: React.FC<PlayerProps> = ({ status, devices }) => {
  const player = usePlayer();
  const deviceId = useGetSpotifyDeviceId(devices)
  console.log(deviceId);
  const { song } = useGetSongById(player.playing, status);

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
