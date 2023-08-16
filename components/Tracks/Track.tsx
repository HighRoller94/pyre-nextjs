"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Song } from "@/types";

import usePlayer from "@/hooks/usePlayer";
import useLoadImage from "@/hooks/useLoadImage";
import LikeButton from "@/components/LikeButton";

import PlayingAnim from "../Base/PlayingAnim";
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

  const dayjs = require("dayjs-with-plugins");

  const artistId = data.user_id;
  const minutes = dayjs.duration(data.duration).minutes();
  const seconds = dayjs
    .duration(data.duration)
    .seconds()
    .toString()
    .padStart(2, "0");

  const generateUrlAndNavigate = (id: string | undefined, path: string) => {
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
      className={`group rounded flex items-center justify-between gap-x-3 bg-neutral-800/100 hover:bg-neutral-800/50 w-full p-2 sm:p-2 h-full relative flex-1 ${
        player.activeId != data.id
          ? "bg-neutral-800/100"
          : "bg-neutral-700/100 hover:bg-neutral-700/100"
      }`}
    >
      <div className="flex items-center w-full ">
        <div className="w-[18px] h-[18px] min-w-[20px] sm:mr-2 sm:ml-2 mr-2 ml-2 flex items-center justify-center">
          {player.activeId != data.id ? (
            <>
              <p className="text-neutral-400 group-hover:hidden">{index + 1}</p>
              <FaPlay
                onClick={handleClick}
                className="text-neutral-400 w-[14px] h-[14px] hidden group-hover:block hover:text-white"
              />
            </>
          ) : (
            <>
              {player.isPlaying ? (
                <PlayingAnim />
              ) : (
                <p className="text-orange-400 font-medium">{index + 1}</p>
              )}
            </>
          )}
        </div>
        {imageUrl ? (
          <div
            onClick={
              data.album_id
                ? () => generateUrlAndNavigate(data.album_id, "album")
                : () => {}
            }
            className="relative cursor-pointer bg-neutral-500 rounded-md min-h-[40px] min-w-[40px] md:min-h-[48px] md:min-w-[48px] overflow-hidden ml-2 opacity-80 hover:opacity-100"
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
        <div className="ml-4 w-8/12 lg:w-12/12 flex flex-col ">
          {player.activeId != data.id ? (
            <>
              <p
                className={`text-white font-medium max-w-8/12 max-w-[160px] sm:max-w-none truncate`}
              >
                {data.title}
              </p>
            </>
          ) : (
            <>
              <p
                className={`text-orange-400 font-medium max-w-8/12 max-w-[160px] truncate`}
              >
                {data.title}
              </p>
            </>
          )}

          <div>
            <div className="flex gap-2">
              {/* {data.artists && (
                <span
                  key={data.id}
                  onClick={() => generateUrlAndNavigate(artistId, "artist")}
                  className="text-neutral-400 text-sm hover:underline font-medium hidden sm:flex"
                >
                  <>{data?.artists[0]?.name}</>
                </span>
              )} */}
              {data.artists ? (
                data?.artists.map((artist, i) => (
                  <span
                    key={artist.id}
                    onClick={() => generateUrlAndNavigate(artistId, "artist")}
                    className="text-neutral-400 text-sm hover:underline font-medium hidden sm:flex cursor-pointer"
                  >
                    <>{artist.name}</>
                  </span>
                ))
              ) : (
                <span
                  // onClick={() => generateUrlAndNavigate(artistId, "artist")}
                  className="text-neutral-400 text-sm hover:underline font-medium hidden sm:flex cursor-pointer"
                >
                  <>{data.author}</>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mr-2 w-fit sm:min-w-[75px] absolute right-2 top-[33%]">
        <LikeButton
          likeStatus={data.likeStatus}
          songId={data.id}
          spotifyUrl={data.spotify_url}
        />
        <p className="text-neutral-400 hidden sm:flex">
          {minutes}:{seconds}
        </p>
      </div>
    </div>
  );
};

export default Track;
