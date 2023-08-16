import { Playlist } from "@/types";
import Image from "next/image";
import { BiTimeFive } from "react-icons/bi";
import FollowPlaylistButton from "@/components/Follow/FollowPlaylistButton";
import Link from "next/link";
interface PlaylistHeaderProps {
  data: Playlist;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ data }) => {
  const dayjs = require("dayjs-with-plugins");

  const values = data.tracks?.map((item) => item.duration);
  const sum = values?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  console.log(data)

  const durationObj = dayjs.duration(sum);

  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  return (
    <div className="flex flex-col sm:flex-row p-10 sm:p-6 items-center justify-center sm:justify-start">
      <div className="relative rounded-full h-44 w-44">
        <Image
          src={data?.image_path || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:ml-6 sm:justify-start sm:text-left sm:items-start mt-4">
        {data.public ? (
          <p className="text-neutral-400 text-sm truncat uppercase font-semibold tracking-widest mb-2">
            Public Playlist
          </p>
        ) : (
          <p className="text-neutral-400 text-sm truncat uppercase font-semibold tracking-widest mb-2">
            Playlist
          </p>
        )}
        <h1 className="text-white text-6xl font-semibold mb-4">{data?.name}</h1>
        <div className="flex flex-col sm:flex-row items-center justify-start w-100">
          <FollowPlaylistButton
            playlistId={data.id}
            spotifyUrl={data.spotify_url}
          />
          <p className="flex items-center text-white text-lg truncate">
            <Link
              href={{
                pathname: `/user/${data?.owner_id}`,
              }}
            >
              <span>{data?.owner_name}</span>
            </Link>
          </p>
          <div className="flex items-center">
            <p className="flex items-center text-neutral-400 text-lg truncat ml-4">
              <BiTimeFive className="mr-2" />
              {hours ? (
                <>
                  {hours} hours {minutes} min
                </>
              ) : (
                <>{minutes} min</>
              )}
            </p>
            <span className="flex items-center text-neutral-400 text-lg truncate ml-2">
              • {data?.track_count} tracks
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
