import { create } from "zustand";

interface ProgressState {
  progress: number;
  setProgress: (value: number) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progress: 0,
  setProgress: (value) => set({ progress: value }),
}));
