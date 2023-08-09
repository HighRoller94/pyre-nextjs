"use client";

import useSound from "use-sound";
import { useState, useEffect } from "react";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "../LikeButton";
import usePlayer from "@/hooks/usePlayer";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./Slider";
import { FiMinimize2 } from "react-icons/fi";
import PlayerControls from "./PlayerControls";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  togglePlayer?: () => void;
  miniPlayer: boolean;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  togglePlayer,
  song,
  songUrl,
  miniPlayer,
}) => {
  const [volume, setVolume] = useState(1);

  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2  sm:grid-cols-3 h-full justify-between relative">
      <div className="flex w-full justify-start">
        <div className="flex items-center max-w-[150px] md:max-w-full gap-x-10">
          <MediaItem data={song} />
          <div className="hidden md:flex">
          <LikeButton songId={song.id} spotifyUrl={song.spotify_url} />
          </div>
        </div>
      </div>
      <PlayerControls song={song} songUrl={songUrl} volume={volume}/>
      <div className="hidden sm:flex w-full justify-end pr-2 items-center gap-6">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer hover:opacity-70"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
        {/* <div>
          <FiMinimize2 onClick={togglePlayer} size={18} />
        </div> */}
      </div>
    </div>
  );
};

export default PlayerContent;
