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
  openSidebar: boolean;
  onClick?: (id: string) => void;
}

const LibraryItem: React.FC<LibraryItemProps> = ({
  data,
  onClick,
  openSidebar,
}) => {
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
      className="flex items-center gap-x-3 w-full max-w-[170px] p-1 rounded-md flex-1 hover:bg-neutral-700"
    >
      <div
        className={`relative rounded-md min-h-[36px] min-w-[36px] overflow-hidden ${
          openSidebar ? "hidden" : "flex"
        }`}
      >
        <Image
          fill
          src={data?.image_path || `/images/liked.png`}
          alt="Media Item Image"
          className="object-cover cursor-pointer opacity-80 hover:opacity-100"
        />
      </div>
      <div className="flex flex-col  overflow:hidden w-full flex-1">
        <p
          className={`text-neutral-400 truncate w-full cursor-pointer hover:text-white transition ${
            openSidebar ? "flex" : "hidden"
          }`}
        >
          {data.name}
        </p>
        {/* <div className="flex gap-2">
          <p className="text-neutral-400 text-sm truncate">
            {data.track_count} tracks
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LibraryItem;
