import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET() {
  var spotifyApi = new SpotifyWebApi();
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    let token: any = session?.provider_token;

    spotifyApi.setAccessToken(token)

    spotifyApi.play()

    return new Response("All good");
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
