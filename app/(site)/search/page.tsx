import getSongsByTitle from "@/util/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";
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
  const songs = await fetchSpotifySearchTracks(searchParams.title);
  const artistsRes = await fetchSpotifySearchArtists(searchParams.title);
  
  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-20 min-h-full">
      <div className="flex flex-col p-6">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
        </div>
      </div>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
