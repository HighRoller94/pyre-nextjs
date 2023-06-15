"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";

import { Playlist } from "@/types";
import Image from "next/image";

interface PlaylistItemProps {
  data: Playlist;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ data }) => {
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

  return (
    <div onClick={Link} className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral/10 transition p-3 pb-1">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          src={data?.image_path || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
      <div  className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data?.name}</p>
        <div className="flex items-center w-full">
          <p className="text-neutral-400 text-sm pb-4 w-full truncate">{data?.track_count} tracks</p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
