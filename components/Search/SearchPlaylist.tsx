"use client";

import { FiSearch } from "react-icons/fi";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { fetchSpotifySearchResults } from "@/util/spotify/fetchSpotifySearchResults";
import SearchTracksContainer from "../Tracks/SearchTracksContainer";
import { addTrackToPlaylist } from "@/util/spotify/addTrackToPlaylist";
import { Song } from "@/types";

interface SearchPlaylistProps {
  playlistTracks: Song[];
  updatePlaylist: () => void;
}

const SpotifySearchClient: React.FC<SearchPlaylistProps> = ({
  playlistTracks,
  updatePlaylist,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trackSearch, setTrackSearch] = useState([]);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  let search = true;
  const handleSearch = async (searchQuery) => {
    const res = await fetchSpotifySearchResults(searchQuery);
    setTrackSearch(res.searchRes);
  };

  useEffect(() => {
    if (!searchQuery) return setTrackSearch([]);
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [debouncedValue, searchQuery]);

  return (
    <>
      <div className="relative w-full mx-6 max-w-[400px] ml-auto my-6">
        <FiSearch
          size={20}
          className="text-neutral-400 absolute top-[25%] left-3 md:top-[25%] md:left-4"
        />
        <input
          placeholder="Search artists..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex items-center w-full rounded bg-neutral-800 border border-transparent px-6 py-3 pl-11 md:pl-12 text-sm placeholder:text-neutral-400 focus:outline-none"
        />
      </div>

      {searchQuery ? (
        <>
          <SearchTracksContainer
            updatePlaylist={updatePlaylist}
            songs={trackSearch}
            search={search}
            playlistTracks={playlistTracks}
          />
        </>
      ) : null}
    </>
  );
};

export default SpotifySearchClient;
