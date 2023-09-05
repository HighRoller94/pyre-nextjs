"use client";

import TitleComponent from "../Base/TitleComponent";
import Track from "@/components/Tracks/Track";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import { fetchSpotifySavedStatus } from "@/util/spotify/fetchSpotifySavedStatus";
import { useEffect, useState } from "react";
import TracksContainerSkel from "../Skels/TracksContainerSkel";
import { useSearchParams } from "next/navigation";

interface SearchTracksContainerProps {
  songs: Song[];
  twoCol?: boolean;
  header?: string;
  subHeader?: string;
  split?: boolean;
  search?: boolean;
  playlistTracks: Song[];
  updatePlaylist: () => void;
}

const SearchTracksContainer: React.FC<SearchTracksContainerProps> = ({
  songs,
  twoCol,
  header,
  subHeader,
  split,
  search,
  playlistTracks,
  updatePlaylist
}) => {
  const onPlay = useOnPlay(songs);
  const [tracks, setTracks] = useState<any>();
  const searchParams = useSearchParams();
  const playlistId = searchParams.get("id");

  useEffect(() => {
    function extractIdsAndCreateString(songs) {
      const limitedArray = songs.slice(0, 50);
      const idsArray = limitedArray.map((obj) => obj.id);
      const idsString = idsArray.join(",");
  
      return idsString;
    }
  
    const idsString = extractIdsAndCreateString(songs);
  
    // Check if idsString is empty before proceeding
    if (!idsString) {
      return;
    }
  
    const combinedFunction = async () => {
      const res = await fetchSpotifySavedStatus(idsString);
  
      const newArray = crossReferenceArrays(playlistTracks, songs);
      const mergedArray = mergeArraysWithLikeStatus(newArray, res.data);
  
      setTracks(mergedArray); // Set tracks state here
    };
  
    combinedFunction();
  }, [songs, playlistTracks]);
  
  function crossReferenceArrays(array1: Song[], array2: Song[]): Song[] {
    return array2.map((item2) => {
      const inPlaylist = array1.some((item1) => item1.id === item2.id);
      return {
        ...item2,
        inPlaylist: inPlaylist,
      };
    });
  }
  
  function mergeArraysWithLikeStatus(songsArray, likesArray) {
    const mergedArray = [];
  
    for (let i = 0; i < songsArray.length; i++) {
      const mergedObject = { ...songsArray[i], likeStatus: likesArray[i] };
      mergedArray.push(mergedObject);
    }
  
    return mergedArray;
  }

  if (!tracks) {
    return (
      <div>
        {header && <TitleComponent header={header} subHeader={subHeader} />}
        <TracksContainerSkel count={songs.length} twoCol={split} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {header && <TitleComponent header={header} subHeader={subHeader} />}

      <div
        className={`flex flex-col gap-y-2 gap-x-6 w-full px-6 my-3 ${
          twoCol && "lg:grid lg:grid-cols-2"
        }`}
      >
        {tracks?.map((song, i) => (
          <div className="flex items-center gap-x-4 w-full" key={song.id}>
            <div className="w-full">
              <Track
                onClick={() => onPlay(song)}
                data={song}
                index={i}
                search={search}
                playlistId={playlistId}
                updatePlaylist={updatePlaylist}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTracksContainer;
