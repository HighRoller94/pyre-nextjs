"use client";

import AlbumItem from "@/components/Album";
import { Album } from "@/types";

interface ArtistAlbumsProps {
  albums: Album[];
}

const ArtistAlbums: React.FC<ArtistAlbumsProps> = ({ albums }) => {
  if (albums.length === 0) {
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
      {albums.slice(0, 16).map((album, i) => (
        <AlbumItem key={album.id} data={album} />
      ))}
    </div>
  );
};

export default ArtistAlbums;
