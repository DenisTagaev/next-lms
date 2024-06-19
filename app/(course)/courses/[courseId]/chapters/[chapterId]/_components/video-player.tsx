"use client"

import dynamic from "next/dynamic";
import MuxPlayerElement from "@mux/mux-player"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"));

import { useProgressStore } from "@/hooks/use-video-progress";
import { ICourseVideoPlayerProps } from "@/lib/interfaces";
import { useConfettiStore } from "@/hooks/use-confetti-store";

const Loader2 = dynamic(() =>
  import("lucide-react").then((mod) => mod.Loader2)
);
const Lock = dynamic(() => import("lucide-react").then((mod) => mod.Lock));

export const VideoPlayer = ({
    chapterId,
    title,
    courseId,
    nextChapterId,
    playbackId,
    isLocked,
    isOwnedByUser,
    completeOnFinish,
}: ICourseVideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const confetti = useConfettiStore();
    const setProgress = useProgressStore((state) => state.setProgress);
    const playerRef = useRef<MuxPlayerElement | null>(null);
    const router = useRouter();

    useEffect(() => {
      if(!isOwnedByUser) {
        const player: MuxPlayerElement | null = playerRef.current;
        
        const handleTimeUpdate = (): void => {
          if (player && player.duration) {
            setProgress((player.currentTime / player.duration) * 100);
          }
        };

        if (player) {
          player.addEventListener("timeupdate", handleTimeUpdate);
          
          return (): void => {
            player.removeEventListener("timeupdate", handleTimeUpdate);
          };
        }
      }
    }, [playerRef.current]);

    const onEnded = async (): Promise<void> => {
      
      if(!isOwnedByUser) {
        try {
          if (completeOnFinish) {
            const axios = (await import("axios")).default;
            await axios.put(
              `/api/courses/${courseId}/chapters/${chapterId}/progress`,
              {
                isCompleted: true,
              }
            );
          }

          if (!nextChapterId) {
            confetti.onOpen();
          }
          
          if (nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
          }
          
          const toast = (await import("react-hot-toast")).default;
          toast.success("Your progress has been updated!");
          router.refresh();
        } catch (error) {
          const { getErrorMessage } = (await import("@/app/(dashboard)/client-utils"));
          getErrorMessage(error);
        }
      } else{
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    };

    return (
      <div className="relative aspect-video">
        {isLocked && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-800
                flex-col gap-y-2 text-secondary"
          >
            <Lock className="h-12 w-12 text-secondary animate-pulse" />
            <p className="md:text-lg">This chapter is locked</p>
          </div>
        )}
        {!isLocked && !isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-900/50">
            <Loader2 className="h-12 w-12 animate-spin text-secondary dark:text-slate-200" />
            <p className="w-full text-center text-secondary dark:text-slate-200">
              Please note, this site is using free tier of MuxPlayer. Videos are
              only stored for 24 hours. Please, create new course to test video
              functionality.
            </p>
          </div>
        )}
        {!isLocked && (
          <MuxPlayer
            ref={playerRef}
            onCanPlay={(): void => setIsReady(true)}
            onEnded={onEnded}
            className={cn(" w-full", !isReady && "hidden")}
            title={title}
            playbackId={playbackId}
            metadata={{
              video_id: playbackId,
              video_title: `Chapter ${title} video`,
            }}
            style={{ aspectRatio: 16 / 9 }}
          />
        )}
      </div>
    );
};
