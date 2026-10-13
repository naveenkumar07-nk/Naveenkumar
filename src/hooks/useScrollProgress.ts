"use client";

import { useState, useEffect, RefObject } from "react";

interface ScrollProgressOptions {
  containerRef?: RefObject<HTMLElement | null>;
}

export function useScrollProgress(options?: ScrollProgressOptions) {
  const [progress, setProgress] = useState<number>(0);
  const [isPinned, setIsPinned] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (options?.containerRef?.current) {
        const el = options.containerRef.current;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalHeight = rect.height - windowHeight;

        if (totalHeight > 0) {
          const currentScroll = -rect.top;
          const rawProgress = Math.max(0, Math.min(1, currentScroll / totalHeight));
          setProgress(rawProgress);
          setIsPinned(rect.top <= 0 && rect.bottom >= windowHeight);
        }
      } else {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const rawProgress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
          setProgress(rawProgress);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [options?.containerRef]);

  return { progress, isPinned };
}
