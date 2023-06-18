"use client";

import ArtistItem from "@/components/Artist";
import { Artist } from "@/types";

interface UserTopArtistsProps {
  artists: Artist[];
}

const UserTopArtists: React.FC<UserTopArtistsProps> = ({ artists }) => {
  if (artists.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
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
      {artists.map((artist, i) => (
        <ArtistItem key={artist.id} data={artist} />
      ))}
    </div>
  );
};

export default UserTopArtists;
