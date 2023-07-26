import { Song } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { subscription, user } = useUser();

  const onPlay = (item: object) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setPlay();
    player.setId(item.id)
    player.setPlaying(item)
    player.setIds(songs.map((song) => song.id));
  }

  return onPlay;
};

export default useOnPlay;