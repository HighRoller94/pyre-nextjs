import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import fetchSpotifySongById from "@/util/spotify/fetchSpotifySongById";
import { Song } from "@/types";

const useSongById = (playing?: object) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!playing) {
      return;
    }
    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', playing.id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      
      setSong(data as Song);
      setIsLoading(false);
    }

    const fetchSpotifySong = async () => {
      const toPlay = await fetchSpotifySongById(playing.id)
      const songToPlay = await toPlay;
      setSong(songToPlay as Song)
    }

    if (playing.spotify_url) {
      // The boolean value is true
      fetchSpotifySong();
    } else {
      // The boolean value is false
      fetchSong();
    }

  }, [playing, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song]);
};

export default useSongById;