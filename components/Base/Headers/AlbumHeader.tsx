import { Album } from "@/types";
import Image from "next/image";
import { BiTimeFive } from "react-icons/bi";

import { FaSpotify } from "react-icons/fa";

interface AlbumHeaderProps {
  data: Album;
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({ data }) => {
  const dayjs = require("dayjs-with-plugins");

  const trackTimes = data.songs?.map((item) => item.duration);
  const totalOfTrackTimes = trackTimes?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const durationObj = dayjs.duration(totalOfTrackTimes);

  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  const releaseYear = dayjs(`${data.release_date}`).format("YYYY");

  return (
    <div className="flex flex-col sm:flex-row p-10 sm:p-6 items-center justify-center sm:justify-start">
      <div className="relative aspect-square rounded-md overflow-hidden border-full h-44 w-44 lg:h-52 lg:w-52">
        <Image
          src={data?.image_path || "/images/liked.png"}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:ml-7 sm:justify-start sm:text-left sm:items-start mt-2 sm:mt-0">
        <div className="flex items-center gap-2 my-2 sm:my-0 sm:mb-1">
          <FaSpotify size={24} className="text-green-500 " />
          <p className="text-neutral-400 text-sm truncate uppercase font-bold tracking-widest my-2">
            Spotify Album
          </p>
        </div>
        <h1 className="text-white text-5xl sm:text-6xl lg:text-6xl font-bold my-2 mb-4">
          {data?.name}
        </h1>
        <div className="flex items-center justify-start w-100">
          <p className="flex items-center text-white text-lg truncate">
            {releaseYear}
          </p>
          <span className="flex items-center text-neutral-400 text-lg truncat ml-4">
            <BiTimeFive className="mr-2" />
            {hours ? (
              <>
                {hours} hours {minutes} min
              </>
            ) : (
              <>{minutes} min</>
            )}
          </span>
          <span className="flex items-center text-neutral-400 text-lg truncate ml-2">
            • {data?.track_count} tracks
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
