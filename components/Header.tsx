"use client";

import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
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

  const handleClick = () => {
    setOpenWindow(!openWindow);
  };

  // const getGreeting = () => {
  //   const currentHour = dayjs().hour();
  //   const name = user?.user_metadata.provider_id

  //   if (currentHour >= 5 && currentHour < 12) {
  //     return `Good morning, ${name.toString()}`;
  //   } else if (currentHour >= 12 && currentHour < 18) {
  //     return `Good afternoon, ${name.toString()}`;
  //   } else {
  //     return `Good evening, ${name.toString()}`;
  //   }
  // };

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
      <div className="p-6 w-full mb-2 flex items-center justify-between z-10 backdrop-blur">
        <div className="hidden md:flex gap-x-2 items-center">
          <button className=" bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretLeft
              onClick={() => router.back()}
              size={32}
              className="text-white"
            />
          </button>
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
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <div className="relative">
                <Button className="bg-white" onClick={handleClick}>
                  <FaUserAlt />
                </Button>
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
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      <Link
                        className="text-gray-700 block px-4 py-2 text-sm"
                        href="/account"
                        onClick={handleClick}
                      >
                        Account
                      </Link>
                      <Link
                        className="text-gray-700 block px-4 py-2 text-sm"
                        href="/search"
                        onClick={handleClick}
                      >
                        Support
                      </Link>
                      <span
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm cursor-pointer"
                        onClick={handleLogout}
                      >
                        Sign out
                      </span>
                    </div>
                  </div>
                </Transition>
              </div>
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
