import DynamicHeader from "@/components/Base/Headers/DynamicHeader";
import TracksContainer from "@/components/Tracks/TracksContainer";
import ContentContainer from "@/components/Content/ContentContainer";

import { fetchRelatedArtists } from "@/util/spotify/fetchRelatedArtists";
import {
  fetchSpotifyArtist,
  fetchSpotifyArtistTopTracks,
} from "@/util/spotify/fetchSpotifyArtists";

import { fetchSpotifyArtistAlbums } from "@/util/spotify/fetchSpotifyAlbums";

export const dynamic = "force-dynamic";

interface SearchProps {
  searchParams: {
    id: string;
  };
}

export default async function ArtistPage({ searchParams }: SearchProps) {
  const artist = await fetchSpotifyArtist(searchParams.id);
  const topTracks = await fetchSpotifyArtistTopTracks(searchParams.id);
  const artistAlbums = await fetchSpotifyArtistAlbums(searchParams.id);
  const relatedArtists = await fetchRelatedArtists(searchParams.id);
  
  let split = true;

  if (!artist || !topTracks || !artistAlbums) {
    return (
      <div className="flex flex-col bg-neutral-900 rounded-lg h-full w-full overflow overlow-y-auto">
        <div className="mt-4 text-neutral-400 pl-6">Somethings gone wrong.</div>
      </div>
    );
  }

  return (
    <>
      <DynamicHeader data={artist} headerType="Artist" />
      <TracksContainer
        songs={topTracks.slice(0, 6)}
        twoCol={split}
        split={split}
        header={"Top Hits"}
      />
      <ContentContainer
        header="Albums"
        contentType="Album"
        content={artistAlbums ? artistAlbums : []}
      />
      <ContentContainer
        header="You might also like"
        contentType="Artist"
        content={relatedArtists ? relatedArtists : []}
      />
    </>
  );
}
