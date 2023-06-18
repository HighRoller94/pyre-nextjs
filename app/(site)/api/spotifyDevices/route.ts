import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {

    try {
      const supabase = createServerComponentClient({
        cookies: cookies,
      });
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      let token: any = session?.provider_token;

      const res = await fetch(
        `https://api.spotify.com/v1/me/player/devices?access_token=${token}`
      );
      const data = await res.json();

      return new Response(JSON.stringify({ data }))
    } catch (err) {
      return new Response("Something went wrong retrieving token");
    }
  }
  