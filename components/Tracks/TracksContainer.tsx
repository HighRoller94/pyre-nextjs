"use client";

import TitleComponent from "../Base/TitleComponent";
import Track from "@/components/Tracks/Track";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import { fetchSpotifySavedStatus } from "@/util/spotify/fetchSpotifySavedStatus";
import { useEffect, useState } from "react";
import TracksContainerSkel from "../Skels/TracksContainerSkel";

interface TracksContainerProps {
  songs: Song[];
  twoCol?: boolean;
  header?: string;
  subHeader?: string;
}

const TracksContainer: React.FC<TracksContainerProps> = ({
  songs,
  twoCol,
  header,
  subHeader,
}) => {
  const onPlay = useOnPlay(songs);
  const [tracks, setTracks] = useState<any>();

  useEffect(() => {
    function extractIdsAndCreateString(songs) {
      const limitedArray = songs.slice(0, 50);
      const idsArray = limitedArray.map((obj) => obj.id);
      const idsString = idsArray.join(",");

      return idsString;
    }
    const idsString = extractIdsAndCreateString(songs);

    const getTrackStatus = async () => {
      const res = await fetchSpotifySavedStatus(idsString);
      // Call the merging function here, once the likesArray is populated
      const mergedArray = mergeArraysWithLikeStatus(songs, res.data);
      setTracks(mergedArray); // Set tracks state here
    };

    getTrackStatus();
  }, [songs]);

  function mergeArraysWithLikeStatus(array1, likesArray) {
    const mergedArray = [];

    for (let i = 0; i < array1.length; i++) {
      const mergedObject = { ...array1[i], likeStatus: likesArray[i] };
      mergedArray.push(mergedObject);
    }

    return mergedArray;
  }

  if (!tracks) {
    return (
      <div>
        {header && <TitleComponent header={header} subHeader={subHeader} />}
        <TracksContainerSkel count={songs.length} twoCol={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {header && <TitleComponent header={header} subHeader={subHeader} />}

      <div
        className={`flex flex-col gap-y-2 gap-x-6 w-full px-6 my-4 ${
          twoCol && "lg:grid lg:grid-cols-2"
        }`}
      >
        {tracks?.map((song, i) => (
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
