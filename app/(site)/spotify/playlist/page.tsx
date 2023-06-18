import Header from "@/components/Header";
import PlaylistTracks from "../components/PlaylistTracks";
import PlaylistHeader from "../components/PlaylistHeader";
import { fetchSpotifyPlaylist } from "@/util/spotify/fetchSpotifyPlaylists";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const revalidate = 120;

interface SearchProps {
  searchParams: {
    id: string;
  };
}

export default async function ArtistPage({ searchParams }: SearchProps) {
  const playlistData = await fetchSpotifyPlaylist(searchParams.id);
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!playlistData) {
    return <div className="mt-4 text-neutral-400">No artist found.</div>;
  }

  let loggedInId = session?.user.user_metadata.provider_id;
  let playlistOwner = playlistData.owner_id;

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-20 min-h-full">
      <Header />
      <PlaylistHeader playlist={playlistData} />
      {loggedInId === playlistOwner ? (
        <p className="flex justify-end mb-2 text-neutral-400 font-medium hover:text-white transition text-sm cursor-pointer pr-6">
          Add to this playlist
        </p>
      ) : (
        ""
      )}
      <PlaylistTracks songs={playlistData?.tracks} />
    </div>
  );
}
