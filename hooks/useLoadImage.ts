import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadImage = (data: Song) => {
  const supabaseClient = useSupabaseClient();
  const imagePath = data.image_path
  
  if (!data) {
    return null;
  }

  if (data.spotify_url) {
    // The boolean value is true
    return imagePath;
  } else {
    // The boolean value is false
    const { data: imageData } = supabaseClient.storage
      .from("images")
      .getPublicUrl(imagePath);

    return imageData.publicUrl;
  }
};

export default useLoadImage;
