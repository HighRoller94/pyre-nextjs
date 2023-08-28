import Header from "@/components/Base/Nav/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/util/getSongs";
import fetchRecent from "@/util/spotify/fetchSpotifyRecent";
import PageContent from "./components/PageContent";
import TitleComponent from "@/components/Base/TitleComponent";
import TitleSkel from "@/components/Skels/TitleSkel";
import { userFollowedArtists, userPlayLists } from "@/util/spotify/fetchUser";
import ContentContainer from "@/components/Content/ContentContainer";
import TracksContainer from "@/components/Tracks/TracksContainer";

export default async function Home() {
  let split = true;
  // const songs = await getSongs();
  const recentlyPlayed = await fetchRecent();
  const playLists = await userPlayLists();
  return (
    <div className="mt-2 md:mt-0">
      {/* <div className="mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div> */}
      {recentlyPlayed && (
        <div>
          <TracksContainer
            twoCol={split}
            split={split}
            songs={recentlyPlayed.slice(0, 8)}
            header={"Shall we jump back in?"}
            subHeader={"Jump in where you left off"}
          />
        </div>
      )}
      <ContentContainer
        header="Saved Playlists"
        subHeader="Jump back in"
        contentType="Playlist"
        content={playLists ? playLists : []}
      />
      {/* <div className="flex flex-col w-full">
        <TitleComponent
          header={"Latest Releases"}
          subHeader={"Newest additions to Pyre"}
        />
        <PageContent songs={songs} />
      </div> */}
    </div>
  );
}
