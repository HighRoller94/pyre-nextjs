import getSongsByTitle from "@/util/getSongsByTitle";
import Header from "@/components/Base/Nav/Header";
import SearchInput from "@/components/Search/SearchInput";
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
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-20 min-h-full">
      <div className="flex flex-col p-6">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-5xl font-semibold">Search Results</h1>
        </div>
      </div>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
