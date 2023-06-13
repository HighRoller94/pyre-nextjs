import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  playing?: object;
  setPlaying: (song: object) => void;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  playing: undefined,
  setPlaying: (song: object) => set({ playing: song }),
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;