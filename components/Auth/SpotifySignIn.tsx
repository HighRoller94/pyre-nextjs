"use client";

import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import LoadingSpinner from "../LoadingSpinner";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

function SpotifySignIn() {
  const { session, isLoading, error } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState()
  
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  if (isLoading || session) {
    return <LoadingSpinner />;
  }

  return (
    <Auth
      supabaseClient={supabaseClient}
      onlyThirdPartyProviders={true}
      providers={["spotify"]}
      queryParams={{
        scope:
          "streaming user-read-recently-played user-top-read user-read-email user-read-private user-library-read user-library-modify user-follow-modify user-follow-read user-read-currently-playing user-read-playback-state user-modify-playback-state playlist-modify-private playlist-read-private playlist-modify-public playlist-read-collaborative streaming",
      }}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "#EFAF1A",
              brandAccent: "#EFAF1A",
            },
          },
        },
      }}
      theme="dark"
    />
  );
}

export default SpotifySignIn;
