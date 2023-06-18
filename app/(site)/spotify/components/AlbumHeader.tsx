import { Album } from "@/types";
import Image from "next/image";
import dayjs from "dayjs";
import { BiTimeFive } from "react-icons/bi";

import { FaSpotify } from "react-icons/fa";

interface AlbumHeaderProps {
  album: Album;
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({ album }) => {
  const duration = require("dayjs/plugin/duration");
  dayjs.extend(duration);

  const values = album.songs?.map((item) => item.duration);
  const sum = values?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const durationObj = dayjs.duration(sum);

  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  const releaseYear = dayjs(`${album.release_date}`).format("YYYY");

  return (
    <div className="flex p-6 items-center">
      <div className="relative aspect-square rounded-md overflow-hidden border-full w-[175px] h-[175px]">
        <Image
          src={album?.image_path || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col ml-6">
        <div className="flex items-center gap-2 mb-1">
          <FaSpotify size={24} className="text-green-500 -mt-2" />
          <p className="text-neutral-400 text-sm truncat uppercase font-semibold tracking-widest mb-2">
            Spotify Album
          </p>
        </div>
        <h1 className="text-white text-6xl font-semibold mb-4">
          {album?.name}
        </h1>
        <div className="flex items-center justify-start w-100">
          <p className="flex items-center text-white text-lg truncate">
            {releaseYear}
          </p>
          <span className="flex items-center text-neutral-400 text-lg truncat ml-4">
            <BiTimeFive className="mr-2" />
            {hours ? (
              <p>
                {hours} hours {minutes} min
              </p>
            ) : (
              <p>{minutes} min </p>
            )}
          </span>
          <span className="flex items-center text-neutral-400 text-lg truncate ml-2">
            • {album?.track_count} tracks
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
