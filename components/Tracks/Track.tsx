"use client";

import { useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Song } from "@/types";
import { addTrackToPlaylist } from "@/util/spotify/addTrackToPlaylist";

import usePlayer from "@/hooks/usePlayer";
import useLoadImage from "@/hooks/useLoadImage";
import LikeButton from "@/components/LikeButton";

import PlayingAnim from "../Base/PlayingAnim";
import { FaPlay } from "react-icons/fa";

interface TrackProps {
  data: Song;
  index: number;
  search?: boolean;
  onClick?: (id: string) => void;
  playlistId?: string;
  updatePlaylist?: () => void;
}

const Track: React.FC<TrackProps> = ({
  data,
  onClick,
  index,
  search,
  playlistId,
  updatePlaylist,
}) => {
  const [added, setAdded] = useState(false);
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

  const handleAddSongToPlaylist = () => {
    addTrackToPlaylist(playlistId, data.spotify_uri);
    setAdded(true);
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
        {/* TRACK IMAGE, PLAYING ANIM + NAME/ARTIST */}
        <div className="flex items-center sm:w-6/12 ">
          <div className="w-[18px] h-[18px] min-w-[20px] sm:mr-2 sm:ml-2 mr-2 ml-2 flex items-center justify-center">
            {player.activeId != data.id ? (
              <>
                <p className="text-neutral-400 group-hover:hidden">
                  {index + 1}
                </p>
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
              className="relative cursor-pointer bg-neutral-500  min-h-[40px] min-w-[40px] md:min-h-[48px] md:min-w-[48px] overflow-hidden ml-2 opacity-80 hover:opacity-100"
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
                  className={`text-white font-medium max-w-8/12 max-w-[160px] sm:max-w-none truncate cursor-pointer`}
                >
                  {data.title}
                </p>
              </>
            ) : (
              <>
                <p
                  className={`text-orange-400 font-medium max-w-8/12 max-w-[160px] sm:max-w-none truncate cursor-pointer`}
                >
                  {data.title}
                </p>
              </>
            )}

            <div className="flex gap-2">
              {data.artists ? (
                data?.artists.slice(0,2).map((artist, i) => (
                  <span
                    key={artist.id}
                    onClick={() => generateUrlAndNavigate(artistId, "artist")}
                    className="text-neutral-400 truncate text-sm hover:text-neutral-50 transition font-medium hidden sm:flex cursor-pointer"
                  >
                    <>{artist.name}</>
                  </span>
                ))
              ) : (
                <span
                  // onClick={() => generateUrlAndNavigate(artistId, "artist")}
                  className="text-neutral-400 truncate text-sm hover:text-neutral-50 transition font-medium hidden sm:flex cursor-pointer"
                >
                  <>{data.author}</>
                </span>
              )}
            </div>
          </div>
        </div>
        {/* TRACK ALBUM NAME */}
        <div className="flex lg:hidden xl:flex justify-start items-center text-left xl:w-3/12 truncate">
          <p
            onClick={() => generateUrlAndNavigate(data.album_id, "album")}
            className="max-w-[250px] xl:max-w-[300px] text-neutral-400 hover:text-neutral-50 transition text-base font-medium hidden lg:flex cursor-pointer truncate"
          >
            {data.album_name}
          </p>
        </div>
        {/* TRACK ADD TO PLAYLIST, LIKE BUTTON + DURATION */}
        <div className="flex items-center justify-between mr-2 w-fit sm:min-w-[75px] absolute right-2 top-[33%]">
          {search && (
            <>
              {data.inPlaylist || added ? (
                <div className="absolute right-24 cursor-pointer bg-orange-500 hover:opacity-8b0 whitespace-nowrap transition px-3 py-2 text-xs font-semibold neutral-400 flex rounded-md uppercase tracking-widest">
                  Remove Track
                </div>
              ) : (
                <div
                  onClick={() => {
                    handleAddSongToPlaylist();
                    updatePlaylist();
                  }}
                  className="absolute right-24 cursor-pointer hover:opacity-100 whitespace-nowrap transition opacity-50 px-3 py-2 text-xs font-semibold neutral-400 flex border border-neutral-400 rounded-md uppercase tracking-widest"
                >
                  Add Track
                </div>
              )}
            </>
          )}

          <LikeButton
            likeStatus={data.likeStatus}
            songId={data.id}
            spotifyUrl={data.spotify_url}
          />
          <div className="hidden sm:flex items-center justify-between w-[32px]">
            <p className="text-neutral-400 hidden sm:flex">{minutes}</p>
            <span className="text-neutral-400 hidden sm:flex">:</span>
            <p className="text-neutral-400 hidden sm:flex">{seconds}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
