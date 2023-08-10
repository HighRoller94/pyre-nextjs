"use client";

import TitleComponent from "../Base/TitleComponent";
import Track from "@/components/Tracks/Track";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

interface TracksContainerProps {
  songs: Song[];
  twoCol?: boolean;
  header?: string,
  subHeader?: string
}

const TracksContainer: React.FC<TracksContainerProps> = ({ songs, twoCol, header, subHeader }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <TitleComponent
        header={header}
        subHeader={subHeader}
      />
      <div
        className={`flex flex-col gap-y-2 gap-x-6 w-full px-6 my-4 ${
          twoCol && "lg:grid lg:grid-cols-2"
        }`}
      >
        {songs.map((song, i) => (
          <div className="flex items-center gap-x-4 w-full" key={song.id}>
            <div className="w-full">
              <Track onClick={() => onPlay(song)} data={song} index={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TracksContainer;
