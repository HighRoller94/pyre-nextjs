import SearchContent from "./components/SearchContent";
import { Song } from "@/types";
import {
  fetchSpotifySearchArtists,
  fetchSpotifySearchTracks,
} from "@/util/spotify/fetchSpotifySearch";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  // const songs = await getSongsByTitle(searchParams.title)
  let songs: Song[] = [];
  const fetchedSongs = await fetchSpotifySearchTracks(searchParams.title);

  if (fetchedSongs) {
    songs = fetchedSongs;
  }

  const artistsRes = await fetchSpotifySearchArtists(searchParams.title);

  return (
    <div className="">
      <SearchContent
        artists={artistsRes}
        songs={songs}
        searchParams={searchParams.title}
      />
    </div>
  );
};

export default Search;
