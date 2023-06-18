"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { fetchfollowArtistStatus, followSpotifyArtist, unfollowSpotifyArtist } from "@/util/spotify/fetchFollowArtistStatus";
import { fetchfollowUserStatus, followSpotifyUser, unfollowSpotifyUser } from "@/util/spotify/fetchFollowUserStatus";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface FollowButtonProps {
  artistId: string;
  spotifyUrl: boolean;
  type?: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ artistId, spotifyUrl, type }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const checkSpotifyFollowStatus = async () => {
      const res = await fetchfollowArtistStatus(artistId)
      setIsLiked(res.getLikedStatus[0]);
      return res;
    };

    // const fetchData = async () => {
    //   const { data, error } = await supabaseClient
    //     .from("liked_songs")
    //     .select("*")
    //     .eq("user_id", user.id)
    //     .eq("song_id", songId)
    //     .single();

    //   if (!error && data) {
    //     setIsLiked(true);
    //   }
    // };
    checkSpotifyFollowStatus();
    // if (spotifyUrl) {

    // } else {
    //   fetchData();
    // }
  }, [artistId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      unfollowSpotifyUser(artistId);
      setIsLiked(false);
      // if (spotifyUrl) {
        
      // } else {
      //   const { error } = await supabaseClient
      //     .from("liked_songs")
      //     .delete()
      //     .eq("user_id", user.id)
      //     .eq("song_id", songId);

      //   if (error) {
      //     toast.error(error.message);
      //   } else {
      //     setIsLiked(false);
      //   }
      // }
    } else {
      followSpotifyUser(artistId);
      setIsLiked(true);
      // if (spotifyUrl) {
      //   likeSpotifySong(songId);
      //   setIsLiked(true);
      // } else {
      //   const { error } = await supabaseClient.from("liked_songs").insert({
      //     song_id: songId,
      //     user_id: user.id,
      //   });

      //   if (error) {
      //     toast.error(error.message);
      //   } else {
      //     setIsLiked(true);
      //     toast.success("Song liked");
      //   }
      // }
    }

    // router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
        mr-4
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default FollowButton;
