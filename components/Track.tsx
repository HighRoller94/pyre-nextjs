"use client";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import LikeButton from "@/components/LikeButton";
import PlayingAnim from "./PlayngAnim";
import { FaPlay } from "react-icons/fa";

interface TrackProps {
  data: Song;
  index: number;
  onClick?: (id: string) => void;
}

const Track: React.FC<TrackProps> = ({ data, onClick, index }) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);
  const durationDate = new Date(data.duration);
  const duration = `${durationDate.getMinutes()}:${durationDate.getSeconds()}`;

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
          <div className="relative rounded-md min-h-[44px] min-w-[44px] overflow-hidden ml-2">
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
        <div className="ml-4 gap-y-1 w-6/12 lg:w-4/12" >
          <p className="text-white  truncate">{data.title}</p>
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-between mr-2">
        <p className="text-neutral-400 mr-4">{duration}</p>
        <LikeButton songId={data.id} />
      </div>
    </div>
  );
};

export default Track;
