"use client"

import ReactConfetti from "react-confetti";

import { ConfettiStore, useConfettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = (): JSX.Element | null => {
    const confetti: ConfettiStore = useConfettiStore();

    if(!confetti.isOpen) return null;

    return (
        <ReactConfetti
            className="pointer-events-none z-[100]"
            numberOfPieces={350}
            recycle={false}
            onConfettiComplete={(): void => { 
                confetti.onClose();
            }}
        />
    )
}
