import { Playlist } from "@/types";
import Image from "next/image";
import { BiTimeFive } from "react-icons/bi";
import LikePlaylistButton from "@/components/FollowPlaylistButton";

interface PlaylistHeaderProps {
  playlist: Playlist;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ playlist }) => {
  const dayjs = require('dayjs-with-plugins');

  const values = playlist.tracks?.map((item) => item.duration);
  const sum = values?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const durationObj = dayjs.duration(sum);

  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  return (
    <div className="flex p-6 items-center">
      <div className="relative aspect-square rounded-md overflow-hidden border-full w-[175px] h-[175px]">
        <Image
          src={playlist?.image_path || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col ml-6">
        {playlist.public ? (
          <p className="text-neutral-400 text-sm truncat uppercase font-semibold tracking-widest mb-2">Public Playlist</p>
        ) : (
          <p className="text-neutral-400 text-sm truncat uppercase font-semibold tracking-widest mb-2">Playlist</p>
        )}
        <h1 className="text-white text-6xl font-semibold mb-4">
          {playlist?.name}
        </h1>
        <div className="flex items-center justify-start w-100">
          <LikePlaylistButton playlistId={playlist.id} spotifyUrl={playlist.spotify_url} />
          <p className="flex items-center text-white text-lg truncate">
            By {playlist?.owner_name}
          </p>
          <p className="flex items-center text-neutral-400 text-lg truncat ml-4">
            <BiTimeFive className="mr-2" />
            {hours ? (
              <p>
                {hours} hours {minutes} min
              </p>
            ) : (
              <p>{minutes} min </p>
            )}
          </p>
          <span className="flex items-center text-neutral-400 text-lg truncate ml-2">
             • {playlist?.track_count} tracks
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
