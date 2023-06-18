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
    const id = context.params.id;

    spotifyApi.setAccessToken(token);

    spotifyApi
      .followPlaylist(id, {
        public: false,
      })
      .then(
        function (data) {
          console.log("Playlist successfully followed privately!");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );

    return new Response("All good");
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
