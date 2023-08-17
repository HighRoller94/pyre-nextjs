import { Figtree } from "next/font/google";
import Image from "next/image";

const font = Figtree({ subsets: ["latin"] });
import SpotifySignIn from "./SpotifySignIn";

const Login = () => {
  return (
    <>
      <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8 bg-black rounded-lg sm:min-w-[400px]">
          <div className="flex items-center justify-center text-center gap-1.5">
            <Image
              src="/images/pyreLogo.png"
              width={46}
              height={46}
              alt="Pyre Logo"
            />
            <h1
              className={`uppercase tracking-wider font-bold text-4xl text-orange-400 ${font.className}`}
            >
              Pyre
            </h1>
          </div>
          <h1
            className={`text-center font-bold text-3xl my-4 mb-2 ${font.className}`}
          >
            Log in to Continue
          </h1>
          <div className="flex items-center justify-center w-full">
            <SpotifySignIn />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
