import getLikedSongs from "@/util/getLikedSong";
import Header from "@/components/Base/Nav/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";
import { fetchUserLikedSongs } from "@/util/spotify/fetchUser";
import TracksContainer from "@/components/Tracks/TracksContainer";

const Liked = async () => {
  const pyreLikedSongs = await getLikedSongs();
  const spotifyLikedSongs = await fetchUserLikedSongs();
  const mergedSongs = [...pyreLikedSongs, ...spotifyLikedSongs];

  return (
    <div className="flex flex-col px-6">
      <div className="md:mt-6">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <Image
              fill
              alt="Playlist"
              className="object-cover"
              src="/images/liked.png"
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
            <p className="hidden md:block font-semibold text-sm">Playlist</p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-5xl font-bold">
              My Library
            </h1>
          </div>
        </div>
      </div>
      <LikedContent
        pyreLikedSongs={pyreLikedSongs}
        spotifyLikedSongs={spotifyLikedSongs ? spotifyLikedSongs : []}
      />
      <TracksContainer songs={mergedSongs ? mergedSongs : []}/>
    </div>
  );
};

export default Liked;
