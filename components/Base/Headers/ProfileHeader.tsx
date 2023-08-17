import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import FollowButton from "@/components/Follow/FollowArtistOrUserButton";

import { AiFillEdit } from "react-icons/ai";
import { User } from "@/types";

import { useUser } from "@/hooks/useUser";

interface ProfileHeaderProps {
  data: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = async ({ data }) => {
  const { user } = useUser();

  const loggedInId = user?.user_metadata.provider_id;
  const userId = data?.id;

  return (
    <div className="flex flex-col sm:flex-row p-10 sm:p-6 items-center justify-center sm:justify-start">
      <div className="relative rounded-full h-44 w-44">
        <Image
          src={data?.image_path || "/images/liked.png"}
          className="object-cover rounded-full"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:ml-6 sm:justify-start sm:text-left sm:items-start mt-4">
        <div className="flex items-center gap-2 mb-1">
          <FaSpotify size={24} className="text-green-500 -mt-2" />
          <p className="text-neutral-400 text-sm truncat uppercase font-bold tracking-widest mb-2">
            Spotify Profile
          </p>
        </div>
        <h1 className="text-white text-5xl sm:text-6xl lg:text-6xl font-semibold my-2 mb-4 ">
          {data?.name}
        </h1>
        <div className="mt-2 flex items-center justify-center gap-x-4">
          {loggedInId === userId ? (
            <div className="flex items-center justify-center bg-orange-400 rounded-full w-8 h-8 transition hover:bg-orange-300">
              <AiFillEdit className="" />
            </div>
          ) : (
            <FollowButton artistId={data?.id} spotifyUrl={data?.spotify_uri} />
          )}

          <p className="text-neutral-400 text-base truncate ">
            {data?.follower_count?.toLocaleString()} followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
