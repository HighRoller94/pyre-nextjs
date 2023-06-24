"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useLoadImage from "@/hooks/useLoadImage";
import LikeButton from "@/components/LikeButton";
import PlayingAnim from "./PlayngAnim";
import dayjs, { Dayjs } from "dayjs";
import { FaPlay } from "react-icons/fa";

interface TrackProps {
  data: Song;
  index: number;
  onClick?: (id: string) => void;
} 

const Track: React.FC<TrackProps> = ({ data, onClick, index }) => {
  const router = useRouter();
  const player = usePlayer();
  const imageUrl = useLoadImage(data);
  const duration = require("dayjs/plugin/duration");
  
  dayjs.extend(duration);

  const minutes = dayjs.duration<Dayjs | null>(data.duration).minutes()
  const seconds = dayjs.duration<Dayjs | null>(data.duration).seconds().toString().padStart(2, '0');

  const generateUrlAndNavigate = (id: string, path: string) => {
    const query = { id };
    const url = qs.stringifyUrl({
      url: `/spotify/${path}`,
      query,
    });
    router.push(url);
  };

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    return player.setId(data.id);
  };

  return (
    <div
      onDoubleClick={handleClick}
      className={`group flex items-center justify-between gap-x-3 cursor-pointer bg-neutral-800/100 hover:bg-neutral-800/50 w-full p-2 rounded-md flex-1 ${
        player.activeId != data.id
          ? "bg-neutral-800/100"
          : "bg-neutral-700/100 hover:bg-neutral-700/100"
      }`}
    >
      <div className="flex items-center w-full">
        <div className="w-[18px] h-[18px] sm:mr-2 sm:ml-2 mr-2 ml-2 flex items-center justify-center">
          {player.activeId != data.id ? (
            <>
              <p className="text-neutral-400 group-hover:hidden">{index + 1}</p>
              <FaPlay
                onClick={handleClick}
                className="text-neutral-400 w-[14px] h-[14px] hidden group-hover:block hover:text-white"
              />
            </>
          ) : (
            <PlayingAnim />
          )}
        </div>
        {imageUrl ? (
          <div
            onClick={
              data.album_id
                ? () => generateUrlAndNavigate(data.album_id, "album")
                : null
            }
            className="relative rounded-md min-h-[44px] min-w-[44px] overflow-hidden ml-2"
          >
            <Image
              fill
              src={imageUrl || `images/liked.png`}
              alt="Media Item Image"
              className="object-cover"
            />
          </div>
        ) : (
          ""
        )}
        <div className="ml-4 gap-y-1 w-8/12 lg:w-12/12 flex items-center">
          <p className="text-white w-100 truncate">{data.title}</p>
          <div>
            <div className="flex ml-2 mt-0.5 items-center">
              {data.artists
                ? data?.artists.map((artist, i) => (
                    <span key={artist.id}
                      onClick={() =>
                        generateUrlAndNavigate(data.author_id, "artist")
                      }
                      className="text-neutral-400 text-sm hover:underline font-medium ml-4"
                    >
                      <>{artist.name}</>
                    </span>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-between mr-2 min-w-[70px]">
        <LikeButton songId={data.id} spotifyUrl={data.spotify_url} />
        <p className="text-neutral-400">{minutes}:{seconds}</p>
      </div>
    </div>
  );
};

export default Track;
