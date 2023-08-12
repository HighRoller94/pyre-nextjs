import { userFollowedArtists, userPlayLists } from "@/util/spotify/fetchUser";
import { userTopArtists, userTopTracks } from "@/util/spotify/fetchUser";

import ContentContainer from "@/components/Content/ContentContainer";
import TracksContainer from "@/components/Tracks/TracksContainer";
export const revalidate = 60;

export default async function Favourites() {
  const followedArtists = await userFollowedArtists();
  const playLists = await userPlayLists();
  const topArtists = await userTopArtists();
  const topTracks = await userTopTracks();

  if (!followedArtists || !playLists || !topTracks || !topTracks) {
    return (
      <div>
        <div className="mt-4 text-neutral-400 pl-6">
          Oh no, something went wrong! Please reconnect to Spotify.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 md:mt-0">
      <TracksContainer
        songs={topTracks ? topTracks.slice(0, 8) : []}
        twoCol={true}
        header={"Your Favourites"}
        subHeader={"Revisiting the classics"}
      />
      <ContentContainer
        header="Your Top Artists"
        subHeader="Revisiting the favourites"
        contentType="Artist"
        content={topArtists ? topArtists : []}
      />
      <ContentContainer
        header="Top Playlists"
        subHeader="Jump back in"
        contentType="Playlist"
        content={playLists ? playLists : []}
      />
      <ContentContainer
        header="Followed Artists"
        subHeader="A few of your followed artists"
        contentType="Artist"
        content={followedArtists ? followedArtists : []}
      />
    </div>
  );
}
