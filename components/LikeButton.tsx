"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  likeSpotifySong,
  unlikeSpotifySong,
} from "@/util/spotify/fetchLikeStatus";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
  spotifyUrl: boolean;
  likeStatus?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, spotifyUrl, likeStatus }) => {
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(likeStatus);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    setIsLiked(likeStatus)

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    if (spotifyUrl) {
      setIsLiked(likeStatus)
    } else {
      fetchData();
    }
  }, [songId, supabaseClient, user?.id, spotifyUrl]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      if (spotifyUrl) {
        unlikeSpotifySong(songId);
        setIsLiked(false);
        toast.success("Song removed from Spotify Liked Songs");
      } else {
        const { error } = await supabaseClient
          .from("liked_songs")
          .delete()
          .eq("user_id", user.id)
          .eq("song_id", songId);

        if (error) {
          toast.error(error.message);
        } else {
          setIsLiked(false);
        }
      }
    } else {
      if (spotifyUrl) {
        likeSpotifySong(songId);
        setIsLiked(true);
        toast.success("Song added to Spotify Liked Songs");
      } else {
        const { error } = await supabaseClient.from("liked_songs").insert({
          song_id: songId,
          user_id: user.id,
        });

        if (error) {
          toast.error(error.message);
        } else {
          setIsLiked(true);
          toast.success("Song liked");
        }
      }
    }

    // router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-90
        transition
        sm:mr-4
        group-hover
        text-orange-500
      "
      onClick={handleLike}
    >
      <Icon
        color={isLiked ? "#f97316" : "white"}
        size={24}
        className={isLiked ? " opacity-100" : "opacity-50 hidden group-hover:flex"}
      />
    </button>
  );
};

export default LikeButton;
