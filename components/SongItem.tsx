"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "./PlayButton";
import { Song } from "@/types";
import useGetArtist from "@/hooks/useGetArtistType";

import { FaSpotify } from "react-icons/fa";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const router = useRouter();
  const imagePath = useLoadImage(data);
  const link = useGetArtist(data);
  const query = {
    id: data.user_id,
  }; 
  const url = qs.stringifyUrl({
    url: `${link}`,
    query: query,
  });
  const Link = () => {
    router.push(url);
  };
  return (
    <div className="relative flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 hover:bg-neutral/10 transition p-3">
      <div className="relative group aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          src={imagePath || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
        <div
          onClick={() => onClick(data.id)}
          className="absolute bottom-3 right-3"
        >
          <PlayButton />
        </div>
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p
          onClick={Link}
          className="text-neutral-400 text-sm mb-4 w-10/12 truncate cursor-pointer hover:text-white"
        >
          {data.author}
        </p>
      </div>
      {data.spotify_url ? (
        <div className="absolute bottom-3 right-3">
          <FaSpotify size={20} className="text-green-500" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SongItem;
