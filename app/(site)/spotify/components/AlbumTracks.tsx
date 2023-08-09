"use client";

import Track from "@/components/Tracks/Track";
import { Song } from "@/types";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface AlbumTracksProps {
  songs: Song[];
}

const AlbumTracks: React.FC<AlbumTracksProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols  gap-y-2 gap-x-6 w-full px-6 mt-4">
      {songs.map((song, i) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <Track onClick={() => onPlay(song)} data={song} index={i} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumTracks;
