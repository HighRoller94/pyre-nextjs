import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function GET(request: Request, context: any) {
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let token: any = session?.provider_token;
    let playlistId = context.params.id;
    let spotifyId = session?.user.user_metadata.name;

    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${spotifyId}&access_token=${token}`
    );

    const getLikedStatus = await res.json();

    return new Response(JSON.stringify({ getLikedStatus }));
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
