import Header from "@/components/Header";
import { userFollowedArtists } from "@/util/spotify/fetchUser";

import ArtistItem from "@/components/Artist";
export const revalidate = 0;

export default async function Favourites() {
  const followedArtists = await userFollowedArtists();

  if (followedArtists?.length === 0) {
    return <div className="mt-4 text-neutral-400">No artists found.</div>;
  }

  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-screen w-full overflow overlow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-4xl font-semibold">
            Your Followed Artists
          </h1>
        </div>
      </Header>
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
        {followedArtists?.map((artist) => (
          <ArtistItem key={artist.id} data={artist} />
        ))}
      </div>
    </div>
  );
}
