"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import usePlayer from "@/hooks/usePlayer";
import useGetArtist from "@/hooks/useGetArtistType";

import { FaSpotify } from 'react-icons/fa'

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  const player = usePlayer();
  const link = useGetArtist(data);
  const router = useRouter();

  const query = {
    id: data.user_id,
  };
  const url = qs.stringifyUrl({
    url: `${link}`,
    query: query,
  });
  const Link = () => {
    router.push(url)
  }

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    return player.setId(data.id);
  };

  return (
    <div className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md flex-1">
      <div
        className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden"
        onClick={handleClick}
      >
        <Image
          fill
          src={imageUrl || `images/liked.png`}
          alt="Media Item Image"
          className="object-cover"
        />
        <FaSpotify />
      </div>
      <div className="flex flex-col gap-y-1 overflow:hidden w-100 flex-1">
        <p className="text-white truncate w-8/12">{data.title}</p>
        <p onClick={Link} className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
