import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SpotifyWebApi from "spotify-web-api-node";

export async function POST(request: Request, context: any) {
  const body = await request.json();
  var spotifyApi = new SpotifyWebApi();

  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let token: any = session?.provider_token;

    spotifyApi.setAccessToken(token);

    spotifyApi.addTracksToPlaylist(`${body.playlistId}`, [`${body.spotifyUri}`]);

    return new Response("All good");
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
