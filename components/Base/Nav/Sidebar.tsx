"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import Box from "../Box";
import SidebarItem from "./SidebarItem";
import Library from "../../Library/Library";

import { MdOpenInNew, MdExplore } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import usePlayer from "@/hooks/usePlayer";

import { Playlist } from "@/types";

interface SidebarProps {
  children: React.ReactNode;
  content?: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, content }) => {
  const player = usePlayer();

  const pathname = usePathname();
  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  let data: Playlist[] | undefined = content;
  const libContent: Playlist[] = data ?? [];

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: MdExplore,
        label: "Explore",
        active: pathname === "/explore",
        href: "/explore",
      },
      {
        icon: AiFillHeart,
        label: "Favourites",
        active: pathname === "/favourites",
        href: "/favourites",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex overflow-hidden h-full min-w-screen w-screen">
      <div
        className={`
        sticky
        top-0
          hidden
          md:flex
          flex-col
          gap-y-2
          bg-black
          h-screen
          border-r-2 border-neutral-800
          overflow-hidden
          transition-all duration-200
          w-full
            ${openSidebar ? "max-w-[225px]" : "max-w-[70px]"}
        `}
      >
        <Box className="overflow-y-auto h-full flex flex-col">
          <div className="flex items-center text-center gap-2 border-b-2 border-neutral-800 px-3 py-6">
            <Image
              src="/images/pyreLogo.png"
              width={40}
              height={40}
              alt="Pyre Logo"
            />
            <h1
              className={`uppercase tracking-wider font-bold text-4xl text-orange-400 ${
                openSidebar ? "flex" : "hidden"
              }`}
            >
              Pyre
            </h1>
          </div>
          <div className="flex flex-col gap-y-3 px-5 py-4 border-b-2 border-neutral-800">
            {routes.map((item) => (
              <SidebarItem
                openSidebar={openSidebar}
                key={item.label}
                {...item}
              />
            ))}
          </div>
          <Library openSidebar={openSidebar} content={libContent} />
          <div
            className={`flex w-full items-end justify-end px-[18px] pt-4 border-t-2 border-neutral-800 mt-auto pb-6 ${
              player.tracks.length > 1 ? "mb-[76px]" : ""
            }`}
          >
            <MdOpenInNew
              onClick={toggleSidebar}
              size={28}
              className="text-orange-400 flex justify-end hover:text-orange-300 transition cursor-pointer"
            />
          </div>
        </Box>
      </div>
      <main className="flex flex-col bg-neutral-900 h-full w-full">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
