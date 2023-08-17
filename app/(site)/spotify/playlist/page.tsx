import TracksContainer from "@/components/Tracks/TracksContainer";
import DynamicHeader from "@/components/Base/Headers/DynamicHeader";

import { fetchSpotifyPlaylist } from "@/util/spotify/fetchSpotifyPlaylists";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Playlist } from "@/types";
import { Song } from "@/types";

import ScrollToBottom from "@/util/scrollToBottom";
export const revalidate = 0;

interface SearchProps {
  searchParams: {
    id: string;
  };
}

export default async function ArtistPage({ searchParams }: SearchProps) {
  // Sorting Playlist

  let playlist: Playlist[] = [];

  const playlistData = await fetchSpotifyPlaylist(searchParams.id);

  if (playlistData) {
    playlist = [playlistData];
  }

  // Sorting Playlist Songs

  let songs: Song[] | undefined = playlistData?.tracks;
  const validSongs: Song[] = songs ?? [];

  // If no playlist data

  if (!playlistData) {
    return <div className="mt-4 text-neutral-400">No artist found.</div>;
  }

  // Sorting Auth for Playlist Editing

  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let loggedInId = session?.user.user_metadata.provider_id;
  let playlistOwner = playlistData.owner_id;

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-20 min-h-full">
      <DynamicHeader data={playlistData} headerType="Playlist" />
      {loggedInId === playlistOwner ? (
        <p
          className="flex justify-end mb-2 text-neutral-400 font-medium hover:text-white transition text-sm cursor-pointer pr-6"
        >
          Add to this playlist
        </p>
      ) : (
        ""
      )}
      <TracksContainer songs={validSongs} />
    </div>
  );
}
