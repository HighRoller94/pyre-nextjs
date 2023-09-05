import { Artist } from "@/types";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import FollowButton from "@/components/Follow/FollowArtistOrUserButton";
import { BsHeadphones } from "react-icons/bs";

interface ArtistHeaderProps {
  data: Artist;
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ data }) => {
  return (
    <div className="flex flex-col sm:flex-row p-10 pb-8 sm:p-6  items-center justify-center sm:justify-start">
      <div className="relative rounded-full h-44 w-44 lg:h-52 lg:w-52">
        <Image
          src={data.image_path || "/images/liked.png"}
          className="object-cover rounded-full"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:ml-7 sm:justify-start sm:text-left sm:items-start mt-4">
        <div className="flex items-center gap-2 mb-1">
          <FaSpotify size={24} className="text-green-500 -mt-2" />
          <p className="text-neutral-400 text-sm truncate uppercase font-bold tracking-widest mb-2">
            Spotify Artist
          </p>
        </div>
        <h1 className="h-full text-white text-4xl sm:text-4xl lg:text-6xl font-bold my-2 mb-4  w-12/12">
          {data?.name}
        </h1>
        <div className="mt-2 flex items-center justify-center gap-x-2">
          <FollowButton
            artistId={data.id}
            spotifyUrl={data.spotify_url}
            type={data.type}
          />
          <div className="flex items-center justify-between text-neutral-400 gap-x-3">
            <BsHeadphones size={24}/>
            <p className="text-sm truncate mt-[2px]">
              {data?.follower_count?.toLocaleString()} followers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
