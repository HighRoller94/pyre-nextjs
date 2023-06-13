import { NextApiRequest, NextApiResponse } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const searchTerm = req.query.code as string;

  // if (!searchTerm) {
  //     return;
  // }

  try {
    const url = new URL(request.url)

    const supabase = createServerComponentClient({
      cookies: cookies,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let token = session?.provider_token;
    
    return new Response(JSON.stringify({ token }))
  } catch (err) {
    return new Response("Something went wrong retrieving token")
  }
}
