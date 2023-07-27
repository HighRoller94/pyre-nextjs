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
import Slider from "../Slider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const player = usePlayer();

  console.log(`current url is ${songUrl}`)
  console.log(`current song is ${song?.title}`)

  const Icon = isPlaying && player.isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.tracks.length === 0) {
      return;
    }
    
    const currentIndex = player.tracks.findIndex((track) => track.id === player.activeId);
    const nextSong = player.tracks[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.tracks[0].id);
    }
    
    player.setPlaying(nextSong)
    player.setId(nextSong.id);
  };

  const onPlayPrevious = () => {
    if (player.tracks.length === 0) {
      return;
    }

    const currentIndex = player.tracks.findIndex((track) => track.id === player.activeId);
    const previousSong = player.tracks[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.tracks[0].id);
    }

    player.setPlaying(previousSong)
    player.setId(previousSong.id);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound, song]);

  const handlePlay = () => {
    if (!isPlaying) {
      // if (song.spotify_url) {
      //   playSpotify();
      //   setIsPlaying(true);
      // } else {
      //   play();
      // }
      // player.setPlay();
      play();
    } else {
      // if (song.spotify_url) {
      //   pauseSpotify();
      //   setIsPlaying(false);
      // } else {
      //   pause();
      // }
      // player.setPause();
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2  md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} spotifyUrl={song.spotify_url} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
