"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";

import { ICourseVideoPlayerProps } from "@/lib/interfaces";

import { Loader2, Lock } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

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
            onEnded={(): void => {}}
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
