"use client";

// Packages/hooks etc

import { useState } from "react";
import { Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import qs from "query-string";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import usePlayer from "@/hooks/usePlayer";

import { createSpotifyPlaylist } from "@/util/spotify/createNewPlaylist";

// Icons etc

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

// Components etc

import { Playlist } from "@/types";
import LibraryItem from "./LibraryItem";

interface LibraryProps {
  content: Playlist[];
  openSidebar: boolean;
}

const Library: React.FC<LibraryProps> = ({ content, openSidebar }) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const pathname = usePathname();
  const [openAddWindow, setOpenAddWindow] = useState(false);
  const router = useRouter();

  const pushUrl = (id) => {
    const url = qs.stringifyUrl({
      url: `/spotify/playlist`,
      query: { id },
    });
    router.push(url);
  };

  const handleCreatePlaylist = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    setOpenAddWindow(!openAddWindow);
    const res = await createSpotifyPlaylist();
    const data = res.data;
    pushUrl(data.id);
  };

  const toggleAddWindow = () => {
    setOpenAddWindow(!openAddWindow);
  };

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    setOpenAddWindow(!openAddWindow);
    return uploadModal.onOpen();
  };

  return (
    <div
      className={`flex flex-col transition ${
        player.tracks.length > 1 ? "h-[61.5%]" : "h-[71%]"
      }`}
    >
      <div
        className={`flex items-center justify-between px-5 py-5 border-b-2 border-neutral-800 ${
          openSidebar ? "flex-row" : "flex-col gap-y-5"
        }`}
      >
        <div className="inline-flex items-center gap-x-2 ">
          <Link
            href="/library"
            className={`flex items-center gap-x-4 group ${
              pathname === "/library" ? "text-orange-400" : "text-neutral-400"
            }`}
          >
            <TbPlaylist
              className={`group-hover:text-white transition ${
                openSidebar
                  ? "min-h-[28px] min-w-[28px]"
                  : "min-h-[30px] min-w-[30px]"
              }`}
            />
            <p
              className={`font-medium group-hover:text-white transition text-md whitespace-nowrap ${
                openSidebar ? "flex" : "hidden"
              }`}
            >
              Your Library
            </p>
          </Link>
        </div>
        <div className="relative">
          <AiOutlinePlus
            onClick={toggleAddWindow}
            className={`${
              openSidebar
                ? "min-h-[22px] min-w-[22px]"
                : "min-h-[26px] min-w-[26px]"
            } text-neutral-400 cursor-pointer transition hover:text-white`}
          />
          <Transition
            show={openAddWindow}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="absolute left-14 top-0 z-50 origin-top-right rounded-md bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <ul
                className="py-1 z-50 fixed w-48 bg-neutral-800 rounded-md"
                role="none"
              >
                <li
                  onClick={handleCreatePlaylist}
                  className="cursor-pointer text-neutral-50 font-semibold hover:bg-neutral-700 block px-4 py-2.5 mx-1 text-sm"
                >
                  Add new playlist
                </li>
                <li
                  onClick={onClick}
                  className="cursor-pointer text-neutral-50 font-semibold hover:bg-neutral-700 block px-4 py-2.5 mx-1 text-sm"
                >
                  Add new song
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 overflow-auto h-full ">
        {content.map((item) => (
          <LibraryItem
            openSidebar={openSidebar}
            onClick={() => {}}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
