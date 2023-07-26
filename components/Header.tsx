"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import qs from "query-string";
import { Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import { twMerge } from "tailwind-merge";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import Button from "./Button";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false);
  const router = useRouter();
  const authModal = useAuthModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const [openWindow, setOpenWindow] = useState(false);
  const [smallHeader, setSmallHeader] = useState(false);

  console.log(user)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;

      if (scrollPosition >= 300 && !smallHeader) {
        setSmallHeader(true);
        console.log("User has scrolled 300px down the page.");
        // You can perform any additional actions you need here.
      }
    };
    // Attach the 'handleScroll' function to the 'scroll' event when the component mounts
    document.addEventListener("scroll", handleScroll, true);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setOpenWindow(!openWindow);
  };

  const getGreeting = () => {
    const currentHour = dayjs().hour();
    const name = user?.user_metadata.provider_id;

    if (currentHour >= 5 && currentHour < 12) {
      return `Good morning, ${name.toString()}`;
    } else if (currentHour >= 12 && currentHour < 18) {
      return `Good afternoon, ${name.toString()}`;
    } else {
      return `Good evening, ${name.toString()}`;
    }
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };

  return (
    <div
      className={twMerge(
        `
    bg-gradient-to-b
    from-amber-900
    h-fit
    sticky
    top-0 z-50
    `,
        className
      )}
    >
      {/* ${
          smallHeader ? "bg-orange-500 h-24" : "bg-green-900 h-20"
        } */}
      <div
        className={`p-6 w-full mb-2 flex items-center justify-between z-10 backdrop-blur transition `}
      >
        <div className="hidden md:flex gap-x-6 items-center">
          <button className=" bg-neutral-900 rounded-full flex items-center justify-center hover:opacity-75 h-full transition">
            <RxCaretLeft
              onClick={() => router.back()}
              size={44}
              className="text-white"
            />
          </button>
          <SearchInput />
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <Link href="/">
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity:-75 transition">
              <HiHome size={20} className="text-black" />
            </button>
          </Link>
          <Link href="/search">
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity:-75 transition">
              <BiSearch size={20} className="text-black" />
            </button>
          </Link>
        </div>
        <div className="flex justify-between items-center relative ">
          {user ? (
            <div className="flex items-center justify-between ">
              {user?.user_metadata?.avatar_url ? (
                <div>
                  <div className="flex items-center gap-x-6 w-full">
                    <h4 className="hidden sm:flex font-bold w-fit">{getGreeting()}</h4>
                    <div className="relative w-12  h-12 cursor-pointer">
                      <Image
                        onClick={handleClick}
                        src={user?.user_metadata?.avatar_url}
                        fill
                        alt="LoggedIn User Avatar"
                        className=" rounded-full min-w-12"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Button className="bg-white" onClick={handleClick}>
                  <FaUserAlt />
                </Button>
              )}

              <Transition
                show={openWindow}
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="absolute right-0 z-10 top-16 w-52 origin-top-right rounded-md bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <Link
                      className="text-neutral-50 font-semibold hover:bg-neutral-700 block px-4 py-2.5 mx-1 text-sm"
                      href="/account"
                      onClick={handleClick}
                    >
                      Account
                    </Link>
                    <Link
                      className="text-neutral-50 font-semibold hover:bg-neutral-700 block px-4 py-2.5 mx-1 text-sm"
                      href={{
                        pathname: `/user/${user.id}`,
                      }}
                      onClick={handleClick}
                    >
                      Profile
                    </Link>
                    <span
                      className="text-neutral-50 font-semibold hover:bg-neutral-700 block w-full px-4 mx-1 py-2.5 text-left text-sm cursor-pointer"
                      onClick={handleLogout}
                    >
                      Sign out
                    </span>
                  </div>
                </div>
              </Transition>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
