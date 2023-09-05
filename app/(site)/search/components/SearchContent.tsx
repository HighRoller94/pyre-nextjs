"use client";

import { Song } from "@/types";
import TitleComponent from "@/components/Base/TitleComponent";
import SearchInput from "@/components/Search/SearchInput";
import TracksContainer from "@/components/Tracks/TracksContainer";
import { Artist } from "@/types";
import ContentContainer from "@/components/Content/ContentContainer";
import ArtistItem from "@/components/Content/Artist";

interface SearchContentProps {
  songs: Song[];
  searchParams: string;
  artists: Artist[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs,
  searchParams,
  artists,
}) => {
  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-y-2 w-full z-20 ">
      <TitleComponent pageTitle={true} header={`Top Results`} />
      <div className="flex items-center justify-center md:hidden mx-6 mb-3 -mt-2">
        <SearchInput />
      </div>
      {searchParams && (
        <div className="flex w-full flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-full h-full">
            <TracksContainer songs={songs} />
          </div>
          {/* <div className="flex flex-col w-full lg:w-7/12">
            <div className="pl-6 pr-6 grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:my-4">
              {artists?.slice(0, 4).map((content, index) => (
                <ArtistItem key={content.id} data={content} />
              ))}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default SearchContent;
