export const fetchfollowStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/spotifyFollowStatus/${id}`);
      return res.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  export const followSpotifyUser = async (id: string) => {
    try {
      await fetch(`/api/spotifyFollow/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const unfollowSpotifyUser = async (id: string) => {
      try {
        await fetch(`/api/spotifyUnfollow/${id}`);
      } catch (err) {
        console.log(err);
      }
    };
    
    