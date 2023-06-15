import Header from "@/components/Header";
import ArtistHeader from "../components/ArtistHeader";
import TopTracks from "../components/ArtistTopTracks";
import ArtistAlbums from "../components/ArtistAlbums";

import {
  fetchSpotifyArtist,
  fetchSpotifyArtistTopTracks,
} from "@/util/spotify/fetchSpotifyArtists";
import { fetchSpotifyArtistAlbums } from "@/util/spotify/fetchSpotifyAlbums";

export const revalidate = 120;

interface SearchProps {
  searchParams: {
    id: string;
  };
}

export default async function ArtistPage({ searchParams }: SearchProps) {
  const artist = await fetchSpotifyArtist(searchParams.id);
  const topTracks = await fetchSpotifyArtistTopTracks(searchParams.id);
  const artistAlbums = await fetchSpotifyArtistAlbums(searchParams.id);

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-20 min-h-full">
      <Header className=""></Header>
      <ArtistHeader artist={artist} />
      <TopTracks songs={topTracks} />
      <div className="p-4 pl-6 md:p-6 mt-2 md:mt-4 flex flex-col gap-y-6">
        <h1 className="text-white text-4xl font-semibold">Albums</h1>
      </div>
      <ArtistAlbums albums={artistAlbums} />
    </div>
  );
}