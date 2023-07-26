"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { likeSpotifySong, unlikeSpotifySong } from "@/util/spotify/fetchLikeStatus";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
  spotifyUrl: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, spotifyUrl }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const checkSpotifyLikeStatus = async () => {
      const res = await fetch(`/api/spotifyLikeStatus/${songId}`);
      const data = await res.json();
      setIsLiked(data.getLikedStatus[0]);
      return data;
    };

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
      checkSpotifyLikeStatus();
    } else {
      fetchData();
    }
  }, [songId, supabaseClient, user?.id]);

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
        hover:opacity-75 
        transition
        sm:mr-4
        text-orange-500
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#f97316" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
