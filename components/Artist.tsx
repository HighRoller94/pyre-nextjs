"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";

import { Artist } from "@/types";
import Image from "next/image";

interface ArtistItemProps {
  data: Artist;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ data }) => {
  const router = useRouter();

  const query = { 
    id: data.id,
  };

  const url = qs.stringifyUrl({
    url: `/spotify/artist`,
    query: query,
  });
  
  const Link = () => {
    router.push(url);
  };

  return (
    <div onClick={Link} className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral/10 transition p-3 pb-1">
      <div className="relative aspect-square w-11/12 h-11/12 rounded-full overflow-hidden mt-2">
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
          <p className="text-neutral-400 text-sm pb-4 w-full truncate">Arist</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistItem;
