import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Artist } from "@/types";
import { Song } from "@/types";

export const fetchRelatedArtists = async (id: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let token = session?.provider_token;

  if (!token) {
    return
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${id}/related-artists?access_token=${token}`
    );
    const data = await res.json();

    const artistById: Artist[] = data.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        type: artist.type,
        image_path: artist.images[0]?.url,
        follower_count: artist.followers.total,
        genres: artist.genres,
        spotify_url: true,
        href: `/spotifyArists/${artist.id}`
      }));

    return artistById;
  } catch (err) {
    console.log(err);
  }
};