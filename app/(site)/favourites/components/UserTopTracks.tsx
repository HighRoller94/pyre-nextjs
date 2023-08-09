"use client";

import Track from "@/components/Tracks/Track";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

interface UserTopTracksProps {
  songs: Song[];
}

const UserTopTracks: React.FC<UserTopTracksProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <>
      <div className="mb-2 flex flex-col gap-y-2 px-6">
        <h1 className="text-neutral-400 text-base md:text-lg truncate">Revisiting your top tracks</h1>
      </div>
      <div className="flex flex-col xl:grid xl:grid-cols-2 gap-y-2 gap-x-6 w-full px-6 my-8">
        {songs.slice(0, 8).map((song, i) => (
          <div className="flex items-center gap-x-4 w-full" key={song.id}>
            <div className="w-full">
              <Track onClick={() => onPlay(song)} data={song} index={i} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTopTracks;
