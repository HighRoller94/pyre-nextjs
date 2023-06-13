import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  
  if (!song) {
    return null;
  }

  if (song.spotify_url) {
    // The boolean value is true
    return song.image_path;
  } else {
    // The boolean value is false
    const { data: imageData } = supabaseClient.storage
      .from("images")
      .getPublicUrl(song.image_path);

    return imageData.publicUrl;
  }
};

export default useLoadImage;
