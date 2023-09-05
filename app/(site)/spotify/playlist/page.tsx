import TracksContainer from "@/components/Tracks/TracksContainer";
import DynamicHeader from "@/components/Base/Headers/DynamicHeader";

import { fetchSpotifyPlaylist } from "@/util/spotify/fetchSpotifyPlaylist";
import SearchForPlaylist from "@/components/Search/SearchPlaylist";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Playlist } from "@/types";
import { Song } from "@/types";

import ScrollToBottom from "@/util/scrollToBottom";
import PlaylistPageContent from "@/components/Content/PlaylistPageContent";

interface PlaylistPageProps {
  searchParams: {
    id: string;
  };
}

export default async function PlaylistPage({
  searchParams,
}: PlaylistPageProps) {
  let playlist: Playlist[] = [];

  const playlistData = await fetchSpotifyPlaylist(searchParams.id);

  if (playlistData) {
    playlist = [playlistData];
  }

  // Sorting Auth for Playlist Editing

  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!playlistData) {
    return <div className="mt-4 text-neutral-400">No artist found.</div>;
  }

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-20 min-h-full">
      <DynamicHeader data={playlistData} headerType="Playlist" />
      <PlaylistPageContent
        session={session}
        playlistData={playlistData}
        paramsId={searchParams.id}
      />
    </div>
  );
}
