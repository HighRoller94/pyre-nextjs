"use client";

import { Song } from "@/types";
import TitleComponent from "@/components/Base/TitleComponent";
import SearchInput from "@/components/Search/SearchInput";
import TracksContainer from "@/components/Tracks/TracksContainer";

interface SearchContentProps {
  songs: Song[];
  searchParams: string;
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs,
  searchParams,
}) => {

  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full ">
      <TitleComponent header={"Search"} />
      <div className="flex items-center justify-center md:hidden max-w-[90%] mx-6 mb-3 -mt-2">
        <SearchInput />
      </div>
      {searchParams && (
        <>
          <p className="px-6">Results for "{searchParams}"</p>
          <TracksContainer songs={songs} />
        </>
      )}
    </div>
  );
};

export default SearchContent;
