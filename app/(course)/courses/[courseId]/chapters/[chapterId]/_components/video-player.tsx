"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";

import { ICourseVideoPlayerProps } from "@/lib/interfaces";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";

import MuxPlayer from "@mux/mux-player-react";
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
    const router = useRouter();
    const confetti = useConfettiStore();

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
          <div className="absolute inset-0 flex items-center justify-center bg-sky-800">
            <Loader2 className="h-12 w-12 animate-spin text-secondary" />
          </div>
        )}
        {!isLocked && (
          <MuxPlayer
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
