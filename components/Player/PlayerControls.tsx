"use client";

import { useEffect, useState } from "react";
import Playbar from "./Playbar";
import usePlayer from "@/hooks/usePlayer";

import useSound from "use-sound";

import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";

interface SliderProps {
  song?: Song;
  songUrl: string;
  volume?: number;
}

const PlayerControls: React.FC<SliderProps> = ({ song, songUrl, volume }) => {
  const player = usePlayer();
  const dayjs = require("dayjs-with-plugins");
  const spotifyPremium = false;
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  // Get duration of song playing
  // If no premium set duration to default song extract (0:30)

  const getSongDuration = (spotifyPremium) => {
    if (!spotifyPremium) {
      return 30; // Return song duration in seconds
    } else {
      const durationInSeconds = dayjs
        .duration(player.playing.duration)
        .asSeconds();
      return durationInSeconds;
    }
  };

  // Play next song logic

  const onPlayNext = () => {
    if (player.tracks.length === 0) {
      return;
    }

    const currentIndex = player.tracks.findIndex(
      (track) => track.id === player.activeId
    );
    const nextSong = player.tracks[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.tracks[0].id);
    }

    player.setPlay();
    player.setPlaying(nextSong);
    player.setId(nextSong.id);
  };

  // Play prev song logic

  const onPlayPrevious = () => {
    if (player.tracks.length === 0) {
      return;
    }

    const currentIndex = player.tracks.findIndex(
      (track) => track.id === player.activeId
    );
    const previousSong = player.tracks[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.tracks[0].id);
    }

    player.setPlay();
    player.setPlaying(previousSong);
    player.setId(previousSong.id);
  };

  // Logic for useSound

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => player.setPlay(),
    onend: () => {
      player.setPause();
      onPlayNext();
    },
    onpause: () => player.setPause(),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    const startTimeInSeconds = 0;
    const songDurationInSeconds = getSongDuration(spotifyPremium);
    const endTimeInSeconds = Math.min(
      songDurationInSeconds,
      startTimeInSeconds + songDurationInSeconds
    );

    const interval = setInterval(() => {
      if (player.isPlaying && currentTime < endTimeInSeconds) {
        setCurrentTime((prevTime) => Math.min(prevTime + 1, endTimeInSeconds));
        setSliderValue((prevSliderValue) =>
          Math.min(prevSliderValue + 1, endTimeInSeconds)
        );
      }
    }, 1000);

    return () => {
      combinedReturns(interval);
    };
  }, [sound, song]);

  const combinedReturns = (interval) => {
    clearInterval(interval);
    sound?.unload();
  };
  const secondsToTimeString = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  // Play pause func

  const handlePlay = () => {
    if (player.isPlaying) {
      // if (song.spotify_url) {
      //   playSpotify();
      //   setIsPlaying(true);
      // } else {
      //   play();
      // }

      pause();
    } else {
      // if (song.spotify_url) {
      //   pauseSpotify();
      //   setIsPlaying(false);
      // } else {
      //   pause();
      // }

      play();
    }
  };

  // Set Icon for play pause

  const Icon = player.isPlaying ? BsPauseFill : BsPlayFill;
  const songDurationInSeconds = getSongDuration(spotifyPremium);
  const currentTimeInSeconds = Math.min(currentTime, songDurationInSeconds);
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center ml-auto w-fit sm:w-full sm:ml-0 ">
        <div className="absolute -top-[18px] -left-[16px] md:static w-full md:flex items-center justify-center gap-x-4 mt-1">
          <span className="hidden md:flex text-xs text-neutral-400">
            {secondsToTimeString(currentTimeInSeconds)}
          </span>
          <Playbar
            playDuration={secondsToTimeString(currentTimeInSeconds)}
            totalDuration={secondsToTimeString(songDurationInSeconds)}
          />
          <span className="hidden md:flex text-xs text-neutral-400">
            {secondsToTimeString(songDurationInSeconds)}
          </span>
        </div>
        <div className="flex justify-center items-center w-full max-w-[722px] gap-x-3 md:gap-x-4 h-14">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-9 w-9 md:h-8 md:w-8 rounded-full bg-white p-1 cursor-pointer hover:bg-opacity-70"
          >
            <Icon size={32} className="text-black w-10" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={24}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
