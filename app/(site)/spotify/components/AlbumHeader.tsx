import { Album } from "@/types";
import Image from "next/image";

interface AlbumHeaderProps {
  album: Album;
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({ album }) => {
  return (
    <div className="flex p-6 items-center">
      <div className="relative aspect-square rounded-md overflow-hidden border-full w-[150px] h-[150px]">
        <Image
          src={album.image_path || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col ml-6">
        <h1 className="text-white text-6xl font-semibold mb-2">{album?.name}</h1>
        <p className="text-neutral-400 text-lg truncate">{album?.release_date} followers</p>
      </div>
    </div>
  );
};

export default AlbumHeader;
