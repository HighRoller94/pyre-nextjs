"use client";

// Packages/hooks etc

import { useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import usePlayer from "@/hooks/usePlayer";

// Icons etc

import { MdOpenInNew, MdExplore } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";

// Components etc

import Box from "../Box";
import SidebarItem from "./SidebarItem";
import Library from "../../Library/Library";
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
      // {
      //   icon: MdExplore,
      //   label: "Explore",
      //   active: pathname === "/explore",
      //   href: "/explore",
      // },
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
    <div className="flex overflow-hidden h-full z-40 min-w-screen w-screen">
      <div
        className={`
        sticky
        top-0
          hidden
          md:flex
          flex-col
          gap-y-2
          bg-black
          z-40
          h-screen
          border-r-2 border-neutral-800
          overflow-hidden
          transition-all duration-200
          w-full
            ${openSidebar ? "max-w-[225px]" : "max-w-[70px]"}
        `}
      >
        <Box className="h-full flex flex-col">
          <div className="flex items-center text-center cursor-pointer gap-3 border-b-2 border-neutral-800 px-3 py-6">
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
            className={`flex w-full items-center px-[18px] pt-4 mt-auto pb-6 transition ${
              player.tracks.length > 1 ? "mb-[80px]" : ""
            } ${openSidebar ?  "justify-end" : "justify-center"}`}
          >
            <MdOpenInNew
              onClick={toggleSidebar}
              size={26}
              className={`text-orange-400 flex justify-end hover:text-orange-300 transition cursor-pointer ${openSidebar && "-rotate-[90deg]"}`}
            />
          </div>
        </Box>
      </div>
      <main
        id="main"
        className="flex flex-col bg-neutral-900 h-full w-full overflow-y-scroll"
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
