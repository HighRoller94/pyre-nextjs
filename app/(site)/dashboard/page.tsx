import Header from "@/components/Base/Nav/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/util/getSongs";
import fetchRecent from "@/util/spotify/fetchSpotifyRecent";
import PageContent from "./components/PageContent";

export default async function Home() {
  const songs = await getSongs();
  const recentlyPlayed = await fetchRecent();

  return (
    <div className="flex flex-col w-full overflow-scroll outline-none border-none h-full">
      <div className="mt-2 px-6">
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
          <div className="pt-6">
            <div className="mb-6">
              <h1 className="text-white text-4xl  font-semibold">
                Shall we jump back in?
              </h1>
              <p className="text-neutral-400 text-lg pt-3 truncate">
                Jump in where you left off
              </p>
            </div>
            <PageContent songs={recentlyPlayed} />
          </div>
        )}
        <div className="flex flex-col zw-full">
          <div className="pt-6">
            <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
          </div>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}
