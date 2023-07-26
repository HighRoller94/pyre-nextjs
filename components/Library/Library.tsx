"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import { Playlist } from "@/types";
import LibraryItem from "./LibraryItem";

interface LibraryProps {
  content: Playlist[];
}

const Library: React.FC<LibraryProps> = ({ content }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  console.log(content)
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // Check for sub

    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer transition hover:text-white"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {content.map((item) => (
          <LibraryItem
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
