"use client";

import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Figtree } from "next/font/google";
import Image from "next/image";
import LoadingSpinner from "../LoadingSpinner";

import { createClient } from "@supabase/supabase-js";

const font = Figtree({ subsets: ["latin"] });

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import { useRouter } from "next/navigation";
import SpotifySignIn from "./SpotifySignIn";

const Login = () => {
  const router = useRouter();
  const { session, isLoading, error } = useSessionContext();

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8 bg-black rounded-lg sm:min-w-[400px]">
          <div className="flex items-center justify-center text-center gap-1">
            <Image
              src="/images/pyreLogo.png"
              width={40}
              height={40}
              alt="Pyre Logo"
            />
            <h1
              className={`uppercase tracking-wider font-bold text-3xl text-orange-400 ${font.className}`}
            >
              Pyre
            </h1>
          </div>
          <h1
            className={`text-center font-bold text-3xl my-4 mb-2 ${font.className}`}
          >
            Log in to Continue
          </h1>
          <SpotifySignIn />
        </div>
      </div>
    </>
  );
};

export default Login;
