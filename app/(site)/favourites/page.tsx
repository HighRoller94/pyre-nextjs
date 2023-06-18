import Header from "@/components/Header";
import { userFollowedArtists, userPlayLists } from "@/util/spotify/fetchUser";
import { userTopArtists } from "@/util/spotify/fetchUser";

import ArtistItem from "@/components/Artist";
import PlaylistItem from "@/components/Playlist";

import UserTopArtists from "../spotify/components/UserTopArtists";
import UserPlaylists from "../spotify/components/UserPlaylists";

export const revalidate = 0;

export default async function Favourites() {
  const followedArtists = await userFollowedArtists();
  const playLists = await userPlayLists();
  const topArtists = await userTopArtists();

  if (followedArtists?.length === 0) {
    return <div className="mt-4 text-neutral-400">No artists found.</div>;
  }

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-20 min-h-full">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-4xl font-semibold">
            Your Top Artists
          </h1>
        </div>
      </Header>
      <UserTopArtists artists={topArtists} />
      <h1 className="p-6 text-white text-4xl font-semibold">Saved Playlists</h1>
      <UserPlaylists playlists={playLists}/>
      <h1 className="p-6 text-white text-4xl font-semibold">Your Followed Artists</h1>
      <div
        className="
        pl-6
        pr-6
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-2
      "
      >
        {followedArtists?.map((playlist) => (
          <PlaylistItem key={playlist.id} data={playlist} />
        ))}
      </div>
    </div>
  );
}
