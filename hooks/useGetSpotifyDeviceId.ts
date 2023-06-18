"use client";

import useSpotify from "./useSpotify";

const useGetSpotifyDeviceId = (devices: any[]) => {
  const spotify = useSpotify();

  let activeItem = devices?.find(item => item.is_active);
  
  if (!activeItem) {
    activeItem = devices?.find(item => item.type === 'Computer');
  }

  return activeItem
};

export default useGetSpotifyDeviceId;
