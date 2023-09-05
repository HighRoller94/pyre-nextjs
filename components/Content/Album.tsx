"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Album } from "@/types";
import Image from "next/image";

interface AlbumProps {
  data: Album;
}

const AlbumItem: React.FC<AlbumProps> = ({ data }) => {
  const router = useRouter();

  const albumYear = dayjs(`${data.release_date}`).format('YYYY');

  const query = { 
    id: data.id,
  };

  const url = qs.stringifyUrl({
    url: `/spotify/album`,
    query: query,
  });
  
  const Link = () => {
    router.push(url);
  };

  return (
    <div onClick={Link} className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral/10 transition p-3 pb-1">
      <div className="relative aspect-square w-full h-full overflow-hidden">
        <Image
          src={data.image_path || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
      <div  className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.name}</p>
        <div className="flex items-center w-full">
          <p className="text-neutral-400 text-sm pb-4 w-full truncate">{albumYear}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumItem;
