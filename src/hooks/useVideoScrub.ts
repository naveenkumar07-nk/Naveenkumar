"use client";

import { useEffect, RefObject } from "react";

interface UseVideoScrubOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  progress: number;
  smoothness?: number;
}

export function useVideoScrub({ videoRef, progress, smoothness = 0.1 }: UseVideoScrubOptions) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration) || video.duration === 0) return;

    const targetTime = progress * video.duration;

    // Fast sync for video currentTime without stuttering
    if (Math.abs(video.currentTime - targetTime) > 0.02) {
      if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
        (video as any).fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
    }
  }, [videoRef, progress]);
}
