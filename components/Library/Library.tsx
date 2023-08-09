"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import Link from "next/link";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import { Playlist } from "@/types";
import LibraryItem from "./LibraryItem";

interface LibraryProps {
  content: Playlist[];
  openSidebar: boolean;
}

const Library: React.FC<LibraryProps> = ({ content, openSidebar }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-6 border-b-2 border-neutral-800">
        <div className="inline-flex items-center gap-x-2 ">
          <Link href="/library" className="flex items-center gap-x-2.5 group">
            <TbPlaylist size={26} className="text-neutral-400 group-hover:text-white transition" />
            <p
              className={`text-neutral-400 font-medium group-hover:text-white transition text-md ${
                openSidebar ? "flex" : "hidden"
              }`}
            >
              Your Library
            </p>
          </Link>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-white cursor-pointer transition hover:text-white"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 overflow-auto max-h-[55vh]">
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
