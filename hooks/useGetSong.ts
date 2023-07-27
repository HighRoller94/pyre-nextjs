import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import fetchSpotifySongById from "@/util/spotify/fetchSpotifySongById";

import { Song } from "@/types";

import { playSpotify } from "@/util/spotify/fetchSpotifyPlayerControls";

const useSongById = (trackPlaying: Song, status: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!trackPlaying) {
      return;
    }
    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', trackPlaying.id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      
      setSong(data as Song);
      setIsLoading(false);
    }

    const fetchSpotifySong = async () => {
      const toPlay = await fetchSpotifySongById(trackPlaying.id, status)
      const songToPlay = await toPlay;
      setSong(songToPlay as Song)
    }

    if (trackPlaying.spotify_url) {
      // The boolean value is true 
      // if (status == 'premium') {
      //   fetchSpotifySong();
      //   playSpotify();
      // }
      fetchSpotifySong();
    } else {
      // The boolean value is false
      fetchSong();
    }

  }, [trackPlaying, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song]);
};

export default useSongById;