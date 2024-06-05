"use client"

import MuxPlayer from "@mux/mux-player-react";
import MuxPlayerElement from "@mux/mux-player"
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useProgressStore } from "@/hooks/use-video-progress";
import { ICourseVideoPlayerProps } from "@/lib/interfaces";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";

import { Loader2, Lock } from "lucide-react";

export const VideoPlayer = ({
    chapterId,
    title,
    courseId,
    nextChapterId,
    playbackId,
    isLocked,
    completeOnFinish,
}: ICourseVideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const setProgress = useProgressStore((state) => state.setProgress);
    const playerRef = useRef<MuxPlayerElement | null>(null);
    const router = useRouter();
    const confetti = useConfettiStore();

    useEffect(() => {
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
    }, [playerRef.current]);

    const onEnded = async (): Promise<void> => {
      try {
        if (completeOnFinish) {
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
        
        toast.success("Your progress has been updated!");
        router.refresh();
      } catch (error) {
        getErrorMessage(error);
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
            autoPlay
          />
        )}
      </div>
    );
};
