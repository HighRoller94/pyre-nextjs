import { Artist } from "@/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface ArtistHeaderProps {
  artist: Artist;
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ artist }) => {
  return (
    <div className="flex flex-col sm:flex-row p-6 items-center justify-center sm:justify-start">
      <div className="relative h-44 w-44">
        <Image
          src={artist.image_path || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:ml-6 sm:justify-start sm:text-left sm:items-start mt-4">
        <h1 className="text-white text-4xl sm:text-6xl lg:text-6xl font-bold mb-2">
          {artist?.name}
        </h1>
        <p className="text-neutral-400 text-lg truncate">
          {artist?.follower_count} followers
        </p>
      </div>
    </div>
  );
};

export default ArtistHeader;
