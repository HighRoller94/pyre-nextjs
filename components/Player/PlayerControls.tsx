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
  const [isPlaying, setIsPlaying] = useState(false);
  const spotifyPremium = false;
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  // Get duration of song playing
  // If no premium set duration to default song extract (0:30)

  const getSongDuration = (spotifyPremium): string => {
    if (!spotifyPremium) {
      const songDuration = `0:30`;
      return songDuration;
    } else {
      const minutes = dayjs.duration(player.playing.duration).minutes();
      const seconds = dayjs
        .duration(player.playing.duration)
        .seconds()
        .toString()
        .padStart(2, "0");
      const songDuration = `${minutes}:${seconds}`;
      return songDuration;
    }
  };

  // Set Icon for play pause
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

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

    const startTime = "0:00";
    const endTime = getSongDuration(spotifyPremium);

    const timeStringToSeconds = (timeString) => {
      const [hours, minutes] = timeString.split(":");
      return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
    };

    const startTimeInSeconds = timeStringToSeconds(startTime);
    const endTimeInSeconds = timeStringToSeconds(endTime);
    const timeDifferenceInSeconds = endTimeInSeconds - startTimeInSeconds;

    // Interval function to update the slider value every second

    const interval = setInterval(() => {
      if (player.isPlaying) {
        setCurrentTime((prevTime) => prevTime + 1);
        setSliderValue((prevSliderValue) => prevSliderValue + 1);
      }
    }, 1000);

    return () => combinedReturns(interval);
  }, [sound, song, player.isPlaying]);

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
    if (!isPlaying) {
      // if (song.spotify_url) {
      //   playSpotify();
      //   setIsPlaying(true);
      // } else {
      //   play();
      // }
      // player.setPlay();
      // setIsPlaying(true);
      play();
      // player.setPlay();
    } else {
      // if (song.spotify_url) {
      //   pauseSpotify();
      //   setIsPlaying(false);
      // } else {
      //   pause();
      // }
      // player.setPause();
      // setIsPlaying(false);
      pause();
      // player.setPause();
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center ml-auto w-fit sm:w-full sm:ml-0 ">
        <div className="absolute -top-[18px] -left-[16px] md:static w-full md:flex items-center justify-center gap-x-4 mt-1">
          <span className="hidden md:flex text-xs text-neutral-400">
            {secondsToTimeString(currentTime)}
          </span>
          <Playbar
            playDuration={secondsToTimeString(currentTime)}
            totalDuration={getSongDuration(spotifyPremium)}
          />
          <span className="hidden md:flex text-xs text-neutral-400">
            {getSongDuration(spotifyPremium)}
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
