"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/Player/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import Track from "@/components/Tracks/Track";

interface LikedContentProps {
  pyreLikedSongs: Song[];
  spotifyLikedSongs: Song[];
};

const LikedContent: React.FC<LikedContentProps> = ({
  pyreLikedSongs,
  spotifyLikedSongs
}) => {
  const mergedSongs = [...pyreLikedSongs, ...spotifyLikedSongs];
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(mergedSongs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (mergedSongs.length === 0) {
    return (
      <div 
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full
          text-neutral-400
        "
      >
        No liked songs.
      </div>
    )
  }

  return ( 
    <div className="flex flex-col gap-y-2 w-full
    py-4 pt-12">
      {mergedSongs.map((song: any, i) => (
        <div 
          key={song.id} 
          className="flex items-center gap-x-4 w-full"
          onClick={() => onPlay(song)}
        >
          <div className="w-full">
            <Track onClick={() => onPlay(song)} data={song} index={i} />
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default LikedContent;