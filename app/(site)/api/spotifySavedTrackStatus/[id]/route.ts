import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(request: Request, context: any) {
  var spotifyApi = new SpotifyWebApi();
 
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let token: any = session?.provider_token;

    const ids = context.params.id;

    spotifyApi.setAccessToken(token);

    const res = await spotifyApi.containsMySavedTracks([ids]);
    const data = res.body

    return new Response(JSON.stringify({ data }));
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
