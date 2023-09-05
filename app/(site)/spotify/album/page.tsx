import { fetchSpotifyAlbum } from "@/util/spotify/fetchSpotifyAlbums";

import DynamicHeader from "@/components/Base/Headers/DynamicHeader";
import TracksContainer from "@/components/Tracks/TracksContainer";
import HeaderSkel from "@/components/Skels/HeaderSkel";
import { Song } from "@/types";
import { Album } from "@/types";

export const revalidate = 60;

interface SearchProps {
  searchParams: {
    id: string;
  };
}
export default async function AlbumPage({ searchParams }: SearchProps) {
  let album: Album[] = [];

  const albumData = await fetchSpotifyAlbum(searchParams.id);

  let songs: Song[] | undefined = albumData?.songs;
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
    <div className="z-20">
      <DynamicHeader data={albumData} headerType="Album" />
      <TracksContainer songs={validSongs} />
    </div>
  );
}
