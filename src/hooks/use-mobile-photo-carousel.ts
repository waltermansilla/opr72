"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_RATIO = 0.18;
const SWIPE_MIN_PX = 48;
const AUTOPLAY_PAUSE_MS = 6000;

type CarouselOptions = {
  infinite?: boolean;
  gapRem?: number;
};

function getRealIndex(trackPos: number, imageCount: number, infinite: boolean) {
  if (!infinite || imageCount <= 1) return trackPos;
  if (trackPos === 0) return imageCount - 1;
  if (trackPos === imageCount + 1) return 0;
  return trackPos - 1;
}

function getSlideStep(gapRem: number) {
  return gapRem > 0 ? `(100% + ${gapRem}rem)` : "100%";
}

export function useMobilePhotoCarousel(
  imageCount: number,
  autoplayMs: number,
  options: CarouselOptions = {},
) {
  const infinite = options.infinite ?? false;
  const gapRem = options.gapRem ?? 0.5;
  const canLoop = infinite && imageCount > 1;

  const [trackPos, setTrackPos] = useState(canLoop ? 1 : 0);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);
  const autoplayPausedRef = useRef(false);
  const autoplayResumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = getRealIndex(trackPos, imageCount, canLoop);

  const pauseAutoplay = useCallback(() => {
    autoplayPausedRef.current = true;
    if (autoplayResumeRef.current) clearTimeout(autoplayResumeRef.current);
    autoplayResumeRef.current = setTimeout(() => {
      autoplayPausedRef.current = false;
    }, AUTOPLAY_PAUSE_MS);
  }, []);

  const goNext = useCallback(() => {
    setTransitionEnabled(true);
    setTrackPos((current) => {
      if (canLoop) return current + 1;
      return (current + 1) % imageCount;
    });
  }, [canLoop, imageCount]);

  const goPrev = useCallback(() => {
    setTransitionEnabled(true);
    setTrackPos((current) => {
      if (canLoop) return current - 1;
      return (current - 1 + imageCount) % imageCount;
    });
  }, [canLoop, imageCount]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mq.matches || reduced.matches) return;

    const timer = window.setInterval(() => {
      if (!autoplayPausedRef.current) {
        goNext();
      }
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [autoplayMs, goNext]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let isHorizontal = false;
    let currentOffset = 0;

    const onTouchStart = (e: TouchEvent) => {
      pauseAutoplay();
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
      isHorizontal = false;
      currentOffset = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking) return;

      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (!isHorizontal) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        isHorizontal = Math.abs(dx) > Math.abs(dy);
      }

      if (!isHorizontal) return;

      e.preventDefault();
      currentOffset = dx;
      setDragOffset(dx);
    };

    const finishSwipe = () => {
      if (!tracking) return;
      tracking = false;

      if (isHorizontal) {
        const threshold = Math.min(el.clientWidth * SWIPE_RATIO, SWIPE_MIN_PX);

        if (currentOffset < -threshold) {
          goNext();
        } else if (currentOffset > threshold) {
          goPrev();
        }
      }

      currentOffset = 0;
      isHorizontal = false;
      setDragOffset(0);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", finishSwipe, { passive: true });
    el.addEventListener("touchcancel", finishSwipe, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", finishSwipe);
      el.removeEventListener("touchcancel", finishSwipe);
    };
  }, [goNext, goPrev, pauseAutoplay]);

  useEffect(() => {
    return () => {
      if (autoplayResumeRef.current) clearTimeout(autoplayResumeRef.current);
    };
  }, []);

  useEffect(() => {
    if (!canLoop || transitionEnabled) return;

    const frame = requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [canLoop, transitionEnabled, trackPos]);

  const handleTransitionEnd = useCallback(() => {
    if (!canLoop) return;

    if (trackPos === 0) {
      setTransitionEnabled(false);
      setTrackPos(imageCount);
      return;
    }

    if (trackPos === imageCount + 1) {
      setTransitionEnabled(false);
      setTrackPos(1);
    }
  }, [canLoop, imageCount, trackPos]);

  const slideStep = getSlideStep(gapRem);
  const trackTransform =
    dragOffset === 0
      ? `translateX(calc(-${trackPos} * ${slideStep}))`
      : `translateX(calc(-${trackPos} * ${slideStep} + ${dragOffset}px))`;

  return {
    active,
    trackPos,
    dragOffset,
    viewportRef,
    trackTransform,
    transitionEnabled,
    handleTransitionEnd,
    canLoop,
  };
}

export function getLoopedSlides<T>(images: readonly T[]) {
  if (images.length <= 1) return [...images];
  return [images[images.length - 1], ...images, images[0]];
}
