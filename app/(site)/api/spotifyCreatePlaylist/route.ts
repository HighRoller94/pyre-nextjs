import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(request: Request) {
  var spotifyApi = new SpotifyWebApi();
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let token = session?.provider_token;

    spotifyApi.setAccessToken(token);

    const res = await spotifyApi.createPlaylist("My Playlist", {
      description: "My New playlist",
      public: true,
    });

    const data = res.body;

    return new Response(JSON.stringify({ data }));
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
