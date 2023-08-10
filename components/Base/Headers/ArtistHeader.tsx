import { Artist } from "@/types";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import FollowButton from "@/components/Follow/FollowArtistOrUserButton";

interface ArtistHeaderProps {
  data: Artist;
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ data }) => {
  return (
    <div className="flex flex-col sm:flex-row p-6 items-center justify-center sm:justify-start">
      <div className="relative rounded-full h-44 w-44 lg:h-52 lg:w-52">
        <Image
          src={data.image_path || "/images/liked.png"}
          className="object-cover rounded-full"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:ml-7 sm:justify-start sm:text-left sm:items-start mt-2">
        <div className="flex items-center gap-2 mb-1">
          <FaSpotify size={24} className="text-green-500 -mt-2" />
          <p className="text-neutral-400 text-sm truncat uppercase font-bold tracking-widest mb-2">
            Spotify Artist
          </p>
        </div>
        <h1 className="text-white text-5xl sm:text-6xl lg:text-6xl font-bold my-2 mb-4">
          {data?.name}
        </h1>
        <div className="mt-2 flex items-center justify-center">
          <FollowButton
            artistId={data.id}
            spotifyUrl={data.spotify_url}
            type={data.type}
          />
          <p className="text-neutral-400 text-base truncate ml-1">
            {data?.follower_count?.toLocaleString()} followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;