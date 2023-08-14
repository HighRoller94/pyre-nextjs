"use client";

import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Figtree } from "next/font/google";
import Image from "next/image";
import LoadingSpinner from "../LoadingSpinner";
import { createClient } from '@supabase/supabase-js'
const font = Figtree({ subsets: ["latin"] });

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { session, isLoading, error } = useSessionContext();

  const supabaseClient = useSupabaseClient();

  const supabase = createClient('https://yuuycvinigzcifepaqra.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1dXljdmluaWd6Y2lmZXBhcXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0NzY2ODEsImV4cCI6MjAwMjA1MjY4MX0.LE10ehwg3pV7_YHHG-ta0wg41e02BBXcSHJDgIl92zc')
  
  // async function signInWithSpotify() {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'spotify',
  //   })
  //   console.log(data)
  // }


  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  console.log(session)
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-fit md:min-w-[450px] bg-black rounded-lg px-12 py-8 border-neutral-900 border-2 flex flex-col items-center">
      <div className="flex items-center text-center gap-1">
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
      <Auth
        supabaseClient={supabase}
        onlyThirdPartyProviders={true}
        providers={["spotify"]}
        queryParams={{
          scope:
            "streaming user-read-recently-played user-top-read user-read-email user-read-private user-library-read user-library-modify user-follow-modify user-follow-read user-read-currently-playing user-read-playback-state user-modify-playback-state playlist-modify-private playlist-read-private playlist-modify-public playlist-read-collaborative streaming",
        }}
        magicLink={true}
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
          className: {
            button: "bg-orange-500",
            //..
          },
        }}
        theme="dark"
      />
    </div>

    // <div>
    //   <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black rounded-lg sm:min-w-[400px]">
    //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //       <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-neutral-100">
    //         Sign in to Pyre
    //       </h2>
    //     </div>

    //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //       <form className="space-y-6" action="#" method="POST">
    //         <div>
    //           <label className="block text-sm font-medium leading-6 text-neutral-100">
    //             Email address
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="email"
    //               name="email"
    //               type="email"
    //               autoComplete="email"
    //               required
    //               className="block w-full rounded-md border-0 py-2 outline-none border-none pl-3 text-neutral-100 shadow-sm sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <div className="flex items-center justify-between">
    //             <label className="block text-sm font-medium leading-6 text-neutral-100">
    //               Password
    //             </label>
    //           </div>
    //           <div className="mt-2">
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               autoComplete="current-password"
    //               required
    //               className="block w-full rounded-md border-0 py-2 outline-none border-none pl-3 text-neutral-100 shadow-sm sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <button
    //             type="submit"
    //             onClick={signInWithSpotify}
    //             className="bg-gradient-to-r from-orange-600 to-orange-500 flex w-full justify-center rounded-full  px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //           >
    //             Sign in
    //           </button>
    //         </div>
    //       </form>
    //       <div className=" mt-8 flex flex-col text-center items-center justify-center gap-y-2">
    //         <div>
    //           <a
    //             href="#"
    //             className="font-semibold text-neutral-100"
    //           >
    //             Forgot password?
    //           </a>
    //         </div>
    //         <p className="text-neutral-300">
    //           Not a member?
    //           <a
    //             href="#"
    //             className="font-semibold ml-2"
    //           >
    //             Start a 14 day free trial
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
