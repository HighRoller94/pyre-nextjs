"use client";

// Packages/hooks etc

import { useEffect, useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

// Icons etc

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";

// Components etc

import SearchInput from "../../Search/SearchInput";
import Button from "../Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [logout, setLogOut] = useState(false);
  const pathname = usePathname();

  const handleScroll = () => {
    // Check if the page is scrolled by comparing scrollY to 0
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
    setLogOut(true);
    if (!error) {
      router.push("/");
    }
  };

  if (logout) {
    return (
      <div
        className="absolute top-0 left-0 w-screen bg-neutral-900 backdrop-blur-lg h-screen z-40 flex justify-center items-center"
        role="status"
      >
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
    <div
      id="header"
      className={twMerge(
        `
        border-b-2
        md:border-none
        backdrop-blur
        border-neutral-700
        md:backdrop-blur-none
        md:bg-opacity-0
        md:bg-gradient-to-b
        from-amber-900
        md:h-[100px]
        sticky
        top-0
        z-50
        transition
        ${isScrolled ? "py-4" : "py-0"}
    `,
        className
      )}
    >
      <div
        className={`px-5 py-4 md:p-6 md:px-6 w-full flex items-center justify-between z-10 md:backdrop-blur transition `}
      >
        <div className="hidden md:flex gap-x-6 items-center">
          <div className="flex items-center gap-2">
            <button className=" bg-neutral-900 rounded-full flex items-center justify-center hover:opacity-75 h-full transition">
              <RxCaretLeft
                onClick={() => router.back()}
                size={36}
                className="text-white"
              />
            </button>
            <button className=" bg-neutral-900 rounded-full flex items-center justify-center hover:opacity-75 h-full transition">
              <RxCaretRight
                onClick={() => router.forward()}
                size={36}
                className="text-white"
              />
            </button>
          </div>
          <SearchInput />
        </div>
        <div className="flex md:hidden gap-x-3 items-center">
          <Link href="/dashboard">
            <button
              className={`${
                pathname === "/dashboard" ? "bg-orange-400" : "bg-white"
              } rounded-full p-2  flex items-center justify-center hover:opacity:-75 transition`}
            >
              <HiHome
                size={20}
                className={`${
                  pathname === "/dashboard" ? "text-white" : " text-black"
                } `}
              />
            </button>
          </Link>
          <Link href="/search">
            <button
              className={`${
                pathname === "/search" ? "bg-orange-400" : "bg-white"
              } rounded-full p-2  flex items-center justify-center hover:opacity:-75 transition`}
            >
              <BiSearch
                size={20}
                className={`${
                  pathname === "/search" ? "text-white" : " text-black"
                } `}
              />
            </button>
          </Link>
          <Link href="/favourites">
            <button
              className={`${
                pathname === "/favourites" ? "bg-orange-400" : "bg-white"
              } rounded-full p-2  flex items-center justify-center hover:opacity:-75 transition`}
            >
              <AiFillHeart
                size={20}
                className={`${
                  pathname === "/favourites" ? "text-white" : " text-black"
                } `}
              />
            </button>
          </Link>
        </div>
        <div className="flex justify-between items-center relative ">
          {user ? (
            <div className="flex items-center justify-between ">
              {user?.user_metadata?.avatar_url ? (
                <div>
                  <div className="flex items-center gap-x-4 w-full">
                    {/* <h4 className="hidden sm:flex md:hidden xl:flex font-bold w-fit">
                      {getGreeting()}
                    </h4> */}
                    <div className="relative w-10  h-10 cursor-pointer">
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
                        pathname: `/user/${user?.user_metadata.provider_id}`,
                      }}
                      onClick={handleClick}
                    >
                      Profile
                    </Link>
                    <span
                      className="text-neutral-50 font-semibold hover:bg-neutral-700 block w-[95%] px-4 mx-1 py-2.5 text-left text-sm cursor-pointer"
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
