import { userFollowedArtists } from "@/util/spotify/fetchUser";
import { userTopArtists, userTopTracks } from "@/util/spotify/fetchUser";

import ContentContainer from "@/components/Content/ContentContainer";
import TracksContainer from "@/components/Tracks/TracksContainer";

export default async function Favourites() {
  const followedArtists = await userFollowedArtists();
  const topArtists = await userTopArtists();
  const topTracks = await userTopTracks();
  let split = true
  
  if (!followedArtists || !topTracks || !topTracks) {
    return (
      <div>
        <div className="mt-4 text-neutral-400 pl-6">
          Oh no, something went wrong! Please reconnect to Spotify.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 md:mt-0 z-20">
      <TracksContainer
        songs={topTracks ? topTracks.slice(0, 8) : []}
        twoCol={split}
        split={split}
        
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
        header="Followed Artists"
        subHeader="A few of your followed artists"
        contentType="Artist"
        content={followedArtists ? followedArtists : []}
      />
    </div>
  );
}
