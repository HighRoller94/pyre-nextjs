import Header from "@/components/Header";
import ArtistHeader from "../components/ArtistHeader";
import TopTracks from "../components/ArtistTopTracks";
import ArtistAlbums from "../components/ArtistAlbums";

import {
  fetchSpotifyArtist,
  fetchSpotifyArtistTopTracks,
} from "@/util/spotify/fetchSpotifyArtists";
import { fetchSpotifyArtistAlbums } from "@/util/spotify/fetchSpotifyAlbums";

export const revalidate = 3600;

interface SearchProps {
  searchParams: {
    id: string;
  };
}

export default async function ArtistPage({ searchParams }: SearchProps) {
  const artist = await fetchSpotifyArtist(searchParams.id);
  const topTracks = await fetchSpotifyArtistTopTracks(searchParams.id);
  const artistAlbums = await fetchSpotifyArtistAlbums(searchParams.id);

  if (!artist || !topTracks || !artistAlbums) {
    return (
      <div className="flex flex-col bg-neutral-900 rounded-lg h-full w-full overflow overlow-y-auto">
        <div className="mt-4 text-neutral-400 pl-6">Somethings gone wrong.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto min-h-full">
      <ArtistHeader artist={artist} />
      <div className="p-4 pl-6 md:p-2 md:pl-6 mt-2 md:mt-2 flex flex-col gap-y-6">
        <h1 className="text-white text-2xl font-semibold">Top Hits</h1>
      </div>
      <TopTracks songs={topTracks} />
      <ArtistAlbums albums={artistAlbums} />
    </div>
  );
}
