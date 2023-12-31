"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  fetchfollowPlaylistStatus,
  followSpotifyPlaylist,
  unfollowSpotifyPlaylist,
} from "@/util/spotify/fetchLikedPlaylistStatus";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface FollowButtonProps {
  playlistId: string;
  spotifyUrl: boolean;
}

const FollowPlaylistButton: React.FC<FollowButtonProps> = ({
  playlistId,
  spotifyUrl,
}) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const checkFollowPlaylistStatus = async () => {
      const res = await fetchfollowPlaylistStatus(playlistId);
      setIsLiked(res.getLikedStatus[0]);
      return res;
    };

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", playlistId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    checkFollowPlaylistStatus();
    // if (spotifyUrl) {

    // } else {
    //   fetchData();
    // }
  }, [playlistId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      if (spotifyUrl) {
        unfollowSpotifyPlaylist(playlistId);
        setIsLiked(false);
        toast.success("Unfollowed Playlist on Spotify");
      } else {
      }
    } else {
      if (spotifyUrl) {
        followSpotifyPlaylist(playlistId);
        setIsLiked(true);
        toast.success("Playlist followed on Spotify");
      } else {
      }
    }

    // router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
        sm:mr-4
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#f97316" : "white"} className="w-12 h-12 sm:h-9 sm:w-9" />
    </button>
  );
};

export default FollowPlaylistButton;
