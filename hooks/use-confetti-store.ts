import { create } from 'zustand';

export type ConfettiStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useConfettiStore = create<ConfettiStore>((set): ConfettiStore=> ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))