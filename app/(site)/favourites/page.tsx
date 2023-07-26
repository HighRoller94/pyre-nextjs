import Header from "@/components/Header";

import { userFollowedArtists, userPlayLists } from "@/util/spotify/fetchUser";
import { userTopArtists, userTopTracks } from "@/util/spotify/fetchUser";

import UserTopArtists from "../spotify/components/UserTopArtists";
import UserPlaylists from "../spotify/components/UserPlaylists";
import UserFollowedArtists from "../spotify/components/UserFollowedArtists";
import UserTopTracks from "../spotify/components/UserTopTracks";

export const revalidate = 60;

export default async function Favourites() {
  const followedArtists = await userFollowedArtists();
  const playLists = await userPlayLists();
  const topArtists = await userTopArtists();
  const topTracks = await userTopTracks();

  if (!followedArtists || !playLists || !topTracks || !topTracks) {
    return (
      <div className="flex flex-col bg-neutral-900 rounded-lg h-full w-full overflow overlow-y-auto">
        <div className="mt-4 text-neutral-400 pl-6">
          Oh no, something went wrong! Please reconnect to Spotify.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto min-h-full pt-6">
      <div className="mb-2 flex flex-col gap-y-6 px-6 py-2">
        <h1 className="text-white text-6xl font-bold">Your Favourites</h1>
      </div>
      <UserTopTracks songs={topTracks ? topTracks : []} />
      <UserTopArtists artists={topArtists ? topArtists : []} />
      <UserPlaylists playlists={playLists ? playLists : []} />
      <UserFollowedArtists artists={followedArtists ? followedArtists : []} />
    </div>
  );
}
