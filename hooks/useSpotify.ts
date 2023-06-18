import { create } from "zustand";

interface SpotifyStore {
  deviceIds: string[];
  activeDeviceId?: string;
  setDeviceId: (id: string) => void;
  setDeviceIds: (ids: string[]) => void;
  reset: () => void;
}

const useSpotify = create<SpotifyStore>((set) => ({
  deviceIds: [],
  activeDeviceId: undefined,
  setDeviceId: (id: string) => set({ activeDeviceId: id }),
  setDeviceIds: (deviceIds: string[]) => set({ deviceIds }),
  reset: () => set({ activeDeviceId: undefined }),
}));

export default useSpotify;
