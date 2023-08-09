"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  fetchfollowArtistStatus,
  followSpotifyArtist,
  unfollowSpotifyArtist,
} from "@/util/spotify/fetchFollowArtistStatus";
import {
  fetchfollowUserStatus,
  followSpotifyUser,
  unfollowSpotifyUser,
} from "@/util/spotify/fetchFollowUserStatus";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface FollowButtonProps {
  artistId: string;
  spotifyUrl: boolean;
  type?: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  artistId,
  spotifyUrl,
  type,
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
    const checkSpotifyFollowStatus = async () => {
      const res = await fetchfollowArtistStatus(artistId);
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

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      unfollowSpotifyUser(artistId);
      setIsLiked(false);
      toast.success("Unfollowed Artist on Spotify");
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
      toast.success("Following Artist on Spotify");
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
    <div>
      {isLiked ? (
        <button
          className="
          flex justify-center items-center
            hover:opacity-75 
            transition
            mr-4
            px-4
            bg-orange-400 py-2
            uppercase
            font-bold
            text-xs
            tracking-widest
            rounded-sm
            border-2
            border-orange-400
            w-28
          "
          onClick={handleLike}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="
          flex justify-center items-center
          hover:opacity-75 
          text-center
          w-28
          transition
          mr-4
          px-4
           bg-transparent py-2
          uppercase
          font-bold
          text-xs
          tracking-widest
          rounded-sm
          border-2
          text-orange-300
          border-orange-400
          "
          onClick={handleLike}
        >
          Follow
        </button>
      )}
    </div>
  );
};
export default FollowButton;
