"use client";
import { FiSearch } from "react-icons/fi";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { fetchSpotifySearchResults } from "@/util/spotify/fetchSpotifySearchResults";
import TracksContainer from "../Tracks/TracksContainer";

const SpotifySearchClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trackSearch, setTrackSearch] = useState([]);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

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

  console.log(trackSearch);
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
        <div className="pb-[104px]">
          <TracksContainer songs={trackSearch} />
        </div>
      ) : null}
    </>
  );
};

export default SpotifySearchClient;
