import { create } from 'zustand';

import { Song } from '@/types';

interface PlayerStore {
  tracks: Song[];
  activeId?: string;
  playing?: Song;
  isPlaying?: boolean;
  setPlaying: (song: Song) => void;
  setId: (id: string) => void;
  setTracks: (song: Song[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  tracks: [],
  activeId: undefined,
  playing: undefined,
  isPlaying: false,
  setPlaying: (song: Song) => set({ playing: song }),
  setPlay: () => set({ isPlaying: true }),
  setPause: () => set({ isPlaying: false }),
  setId: (id: string) => set({ activeId: id }),
  setTracks: (tracks: Song[]) => set({ tracks }),
  reset: () => set({ tracks: [], activeId: undefined })
}));

export default usePlayer;