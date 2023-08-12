import Header from "@/components/Base/Nav/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/util/getSongs";
import fetchRecent from "@/util/spotify/fetchSpotifyRecent";
import PageContent from "./components/PageContent";
import TitleComponent from "@/components/Base/TitleComponent";

export default async function Home() {
  const songs = await getSongs();
  const recentlyPlayed = await fetchRecent();

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
          <TitleComponent
            header={"Shall we jump back in?"}
            subHeader={"Jump in where you left off"}
            pageTitle={true}
          />
          <PageContent songs={recentlyPlayed.slice(0, 16)} />
        </div>
      )}
      <div className="flex flex-col w-full">
        <TitleComponent
          header={"Latest Releases"}
          subHeader={"Newest additions to Pyre"}
        />
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
