"use client";

import Track from "@/components/Tracks/Track";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import TitleComponent from "@/components/Base/TitleComponent";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full ">
      <TitleComponent header={"Search Results"} />
      {songs.map((song, i) => (
        <div className="flex items-center gap-x-4 px-6 w-full" key={song.id}>
          <div className="flex-1">
            <Track onClick={() => onPlay(song)} data={song} index={i} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
