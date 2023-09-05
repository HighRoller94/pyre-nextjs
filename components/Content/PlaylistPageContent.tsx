"use client";

import React, { useEffect, useState } from "react";

import TracksContainer from "../Tracks/TracksContainer";
import { Playlist } from "@/types";
import { Song } from "@/types";

import SearchForPlaylist from "@/components/Search/SearchPlaylist";

interface PlaylistPageContentProps {
  playlistData: any;
  session: any;
  paramsId: string;
}

const PlaylistPageContent: React.FC<PlaylistPageContentProps> = ({
  playlistData,
  session,
  paramsId,
}) => {
  const [tracks, setTracks] = useState();
  const [count, setCount] = useState(0);

  function updatePlaylist() {
    setCount((prevCount) => prevCount + 1);
  }
  const getPlaylistTracks = async () => {
    const res = await fetch(`/api/spotifyGetPlaylist/${paramsId}`);
    const data = await res.json();
    console.log(data.playlistById.tracks);
    setTracks(data.playlistById.tracks);
  };

  useEffect(() => {
    getPlaylistTracks();
  }, [count, paramsId]);

  let loggedInId = session?.user.user_metadata.provider_id;
  let playlistOwner = playlistData?.owner_id;

  // Sorting Playlist Songs

  let songs: Song[] | undefined = tracks;
  const validSongs: Song[] = songs ?? [];

  function ScrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  return (
    <div className="pb-20">
      {loggedInId === playlistOwner ? (
        <p
          onClick={ScrollToBottom}
          className="flex justify-end mb-2 text-neutral-400 font-medium hover:text-white transition text-sm cursor-pointer pr-6"
        >
          Add to this playlist
        </p>
      ) : (
        ""
      )}
      <TracksContainer songs={validSongs} />
      {loggedInId === playlistOwner ? (
        <SearchForPlaylist
          playlistTracks={validSongs}
          updatePlaylist={updatePlaylist}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PlaylistPageContent;
