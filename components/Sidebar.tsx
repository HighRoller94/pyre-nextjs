"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library/Library";

import { Song } from "@/types";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { MdExplore } from "react-icons/md";

import { Playlist } from "@/types";

interface SidebarProps {
  children: React.ReactNode;
  content?: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, content }) => {
  const pathname = usePathname();

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
    <div className="flex h-full">
      <div
        className="hidden
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[300px]
        p-2"
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library content={libContent} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
