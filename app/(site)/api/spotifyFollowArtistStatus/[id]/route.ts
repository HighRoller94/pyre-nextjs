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
    const id = context.params.id;

    const res = await fetch(
      `https://api.spotify.com/v1/me/following/contains?ids=${id}&type=artist&access_token=${token}`
    );
    const getLikedStatus = await res.json();

    return new Response(JSON.stringify({ getLikedStatus }))
  } catch (err) {
    return new Response("Something went wrong retrieving token");
  }
}
