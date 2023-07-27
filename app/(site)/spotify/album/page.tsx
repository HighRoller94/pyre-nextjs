import { fetchSpotifyAlbum } from "@/util/spotify/fetchSpotifyAlbums";
import AlbumTracks from "../components/AlbumTracks";
import AlbumHeader from "../components/AlbumHeader";
import { Song } from "@/types";
import { Album } from "@/types";

export const revalidate = 3600;

interface SearchProps {
  searchParams: {
    id: string;
  };
}
export default async function AlbumPage({ searchParams }: SearchProps) {
  let album: Album[] = [];

  const albumData = await fetchSpotifyAlbum(searchParams.id);

  let songs: Song[] | undefined = albumData?.songs
  const validSongs: Song[] = songs ?? [];
  
  if (albumData) {
    album = [albumData];
  }

  if (!albumData) {
    return (
      <div className="flex flex-col bg-neutral-900 rounded-lg h-full w-full overflow overlow-y-auto">
        <div className="mt-4 text-neutral-400 pl-6">Somethings gone wrong.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-8 min-h-full">
      <AlbumHeader album={albumData} />
      <AlbumTracks songs={validSongs} />
    </div>
  );
}
