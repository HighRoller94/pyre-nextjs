import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  playing?: object;
  isPlaying?: boolean;
  setPlaying: (song: object) => void;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  playing: undefined,
  isPlaying: false,
  setPlaying: (song: object) => set({ playing: song }),
  setPlay: () => set ({ isPlaying: true }),
  setPause: () => set({ isPlaying: false }),
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;