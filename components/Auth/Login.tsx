"use client";

import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Figtree } from "next/font/google";
import Image from "next/image";

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

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (isLoading || session) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-fit md:min-w-[450px] bg-black rounded-lg px-12 py-8 border-neutral-900 border-2 flex flex-col items-center">
      <div className="flex items-center text-center gap-1">
        <Image src="/images/pyreLogo.png" width={40} height={40} alt="Pyre Logo" />
        <h1 className={`uppercase tracking-wider font-bold text-3xl text-orange-400 ${font.className}`}>Pyre</h1>
      </div>
      <h1 className={`text-center font-bold text-3xl my-4 mb-2 ${font.className}`}>
        Log in to Continue
      </h1>
      <Auth
        supabaseClient={supabaseClient}
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
