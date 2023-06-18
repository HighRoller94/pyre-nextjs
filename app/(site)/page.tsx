import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/util/getSongs";
import fetchRecent from "@/util/spotify/fetchSpotifyRecent";

import PageContent from "./components/PageContent";
import test from "@/hooks/useSpotifyWebPlayback";
export const revalidate = 30;

export default async function Home() {
  const songs = await getSongs();
  const recentlyPlayed = await fetchRecent();
  test();
  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-100 w-full overflow overlow-y-auto pb-20 min-h-full">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        {recentlyPlayed ? (
          <>
            <div>
              <h1 className="text-white text-2xl font-semibold">
                Shall we jump back in?
              </h1>
            </div>
            <PageContent songs={recentlyPlayed} />
          </>
        ) : (
          <>
            <div>
              <h1 className="text-white text-2xl font-semibold">
                Newest Songs
              </h1>
            </div>
            <PageContent songs={songs} />
          </>
        )}
      </div>
    </div>
  );
}
