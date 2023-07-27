"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import { Playlist } from "@/types";
import Image from "next/image";
import usePlayer from "@/hooks/usePlayer";
import useGetArtist from "@/hooks/useGetArtistType";

import { FaSpotify } from "react-icons/fa";

interface LibraryItemProps {
  data: Playlist;
  onClick?: (id: string) => void;
}

const LibraryItem: React.FC<LibraryItemProps> = ({ data, onClick }) => {

  const player = usePlayer();
  const router = useRouter();

  const query = {
    id: data.id,
  };
  const url = qs.stringifyUrl({
    url: `/spotify/playlist`,
    query: query,
  });

  const Link = () => {
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
      onClick={Link}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md flex-1"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={data?.image_path || `/images/liked.png`}
          alt="Media Item Image"
          className="object-cover"
        />
        <FaSpotify />
      </div>
      <div className="flex flex-col gap-y-1 overflow:hidden w-100 flex-1">
        <p className="text-white truncate w-8/12 md:w-full">{data.name}</p>
        <div className="flex gap-2">
          <p className="text-neutral-400 text-sm truncate">
            {data.track_count} tracks
          </p>
        </div>
      </div>
    </div>
  );
};

export default LibraryItem;
