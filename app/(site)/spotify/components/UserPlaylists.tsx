"use client";

import { useState } from "react";

import PlaylistItem from "@/components/Playlist";
import { Playlist } from "@/types";

interface UserPlaylistsProps {
  playlists: Playlist[];
}

const UserPlaylists: React.FC<UserPlaylistsProps> = ({ playlists }) => {
  const [displayedArtists, setDisplayedArtists] = useState(8);
  const visibleArtists = playlists.slice(0, displayedArtists);

  const showArtists = () => {
    setDisplayedArtists(playlists.length);
  };

  const hideArtists = () => {
    setDisplayedArtists(8);
  };

  if (playlists.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No playlists found.
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4">
      <div className="p-6 w-full flex justify-between">
      <div className="flex flex-col">
          <h1 className="text-white text-4xl font-bold">Top Playlists</h1>
          <p className="text-neutral-400 text-lg pt-3 truncate">
            Jump back in
          </p>
        </div>
        {playlists.length > displayedArtists ? (
          <button
            className="text-neutral-400 cursor-pointer hover:text-white transition flex justify-end items-end"
            onClick={showArtists}
          >
            Show More
          </button>
        ) : (
          <button
            className="text-neutral-400 cursor-pointer hover:text-white transition flex justify-end items-end"
            onClick={hideArtists}
          >
            See Less
          </button>
        )}
      </div>
      <div
        className="
      pl-6
      pr-6
      grid 
      grid-cols-2 
      sm:grid-cols-3 
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-5 
      2xl:grid-cols-8 
      gap-4 
      mt-4"
      >
        {visibleArtists.map((playlist, index) => (
          <PlaylistItem key={playlist.id} data={playlist} />
        ))}
      </div>
    </div>
  );
};

export default UserPlaylists;
