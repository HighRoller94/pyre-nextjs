"use client";

import { useState } from "react";

import AlbumItem from "@/components/Album";
import { Album } from "@/types";

interface ArtistAlbumsProps {
  albums: Album[];
}

const ArtistAlbums: React.FC<ArtistAlbumsProps> = ({ albums }) => {
  const [displayedAlbums, setDisplayedAlbums] = useState(8);
  const visibleAlbums = albums.slice(0, displayedAlbums);

  const showAlbums = () => {
    setDisplayedAlbums(albums.length);
  };

  const hideAlbums = () => {
    setDisplayedAlbums(8);
  };

  if (albums.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-6">
        <div className="p-4 pl-6 md:p-2 md:pl-6 mt-2 md:mt-4 flex flex-col gap-y-6">
        <div className="w-full flex justify-between">
          <h1 className="text-white text-2xl font-semibold">Albums</h1>
          {albums.length > displayedAlbums ? (
          <button
            className="text-neutral-400 cursor-pointer hover:text-white transition flex justify-end items-end pr-6"
            onClick={showAlbums}
          >
            Show all albums
          </button>
        ) : (
          <button
            className="text-neutral-400 cursor-pointer hover:text-white transition flex justify-end items-end pr-6"
            onClick={hideAlbums}
          >
            See Less
          </button>
        )}
        </div>
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
        {visibleAlbums.slice(0, 16).map((album, i) => (
          <AlbumItem key={album.id} data={album} />
        ))}
      </div>
    </div>
  );
};

export default ArtistAlbums;
