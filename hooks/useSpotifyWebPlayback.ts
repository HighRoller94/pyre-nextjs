

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function test() {
    const { SpotifyPlaybackSDK } = require("spotify-playback-sdk-node");
    
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
      console.log(token)
    

	const spotify = new SpotifyPlaybackSDK();
	await spotify.init({ /* puppeteerLaunchArgs */ });

	const player = await spotify.createPlayer({
		name: "Web",
		getOAuthToken() {
			token
			return "";
		},
	});
	player.on("player_state_changed", console.log);

	const stream = await player.getAudio();
	const connected = await player.connect();
	if (!connected) throw "couldn't connect";

	console.log("connected", stream);
}

