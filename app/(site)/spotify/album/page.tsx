import { fetchSpotifyAlbum } from "@/util/spotify/fetchSpotifyAlbums";
import Header from "@/components/Header";
import AlbumTracks from "../components/AlbumTracks";
export const revalidate = 120;

interface SearchProps {
  searchParams: {
    id: string;
  };
}

export default async function AlbumPage({ searchParams }: SearchProps) {
  const albumData = await fetchSpotifyAlbum(searchParams.id)

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-screen w-full overflow overlow-y-auto">
      <Header>
      </Header>
      <AlbumTracks songs={albumData?.songs} />
    </div>
  );
}
