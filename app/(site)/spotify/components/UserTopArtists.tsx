"use client";

import { useState } from "react";

import ArtistItem from "@/components/Artist";
import { Artist } from "@/types";

interface UserTopArtistsProps {
  artists: Artist[];
}

const UserTopArtists: React.FC<UserTopArtistsProps> = ({ artists }) => {
  const [displayedArtists, setDisplayedArtists] = useState(8);
  const visibleArtists = artists.slice(0, displayedArtists);

  const showArtists = () => {
    setDisplayedArtists(artists.length);
  };

  const hideArtists = () => {
    setDisplayedArtists(8);
  };

  if (artists.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4">
      <div className="p-6 w-full flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-white text-4xl font-bold">Your Top Artists</h1>
          <p className="text-neutral-400 text-lg pt-4 truncate">
            Revisiting the top hits
          </p>
        </div>

        {artists.length > displayedArtists ? (
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
        {visibleArtists.map((artist, index) => (
          <ArtistItem key={artist.id} data={artist} />
        ))}
      </div>
    </div>
  );
};

export default UserTopArtists;
