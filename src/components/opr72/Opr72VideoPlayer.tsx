"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type VideoOrientation = "portrait" | "landscape";

type Opr72VideoPlayerProps = {
  poster: string;
  video?: string | null;
  cta: string;
  ctaSoon?: string;
  orientation?: VideoOrientation;
  variant?: "default" | "stage";
  posterKey?: string;
  className?: string;
};

export default function Opr72VideoPlayer({
  poster,
  video = null,
  cta,
  ctaSoon = "Video en preparación",
  orientation = "landscape",
  variant = "default",
  posterKey,
  className = "",
}: Opr72VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ready = Boolean(video);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setPlaying(false);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  }, [video]);

  const stop = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stop();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [playing, stop]);

  const play = useCallback(() => {
    if (!ready) return;
    setPlaying(true);
    setMuted(false);
  }, [ready]);

  useEffect(() => {
    if (!playing || !ready) return;

    const el = videoRef.current;
    if (!el) return;

    el.muted = false;
    void el.play().catch(() => {
      el.muted = true;
      setMuted(true);
      void el.play();
    });
  }, [playing, ready]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
  }, [muted]);

  const fullscreenVideoClass =
    orientation === "portrait"
      ? "h-full max-h-[100dvh] w-auto max-w-[100vw] object-contain"
      : "h-auto max-h-[100dvh] w-full max-w-[100vw] object-contain";

  const overlay =
    playing && ready && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/95 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Reproductor de video"
            onClick={stop}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                stop();
              }}
              className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-sm transition active:scale-95 sm:top-6 sm:right-6"
              aria-label="Cerrar video"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-sm transition active:scale-95 sm:top-6 sm:left-6"
              aria-label={muted ? "Activar sonido" : "Silenciar"}
            >
              {muted ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>

            <div
              className="relative z-10 flex max-h-full max-w-full items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={video ?? undefined}
                className={fullscreenVideoClass}
                playsInline
                controls
                muted={muted}
                onEnded={stop}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  const isStage = variant === "stage";

  return (
    <>
      <div className={`opr-video-preview w-full ${className}`}>
        <div
          className={`relative aspect-video w-full overflow-hidden bg-[var(--opr-navy)] ${
            isStage
              ? "rounded-xl shadow-md shadow-[var(--opr-navy)]/10"
              : "rounded-2xl border border-[var(--opr-navy)]/10 shadow-xl shadow-black/10"
          }`}
        >
          <Image
            key={posterKey ?? poster}
            src={poster}
            alt=""
            fill
            className={`object-cover ${isStage ? "opr-port-poster-zoom" : ""}`}
            sizes="(max-width: 1024px) 100vw, 416px"
          />
          <div className="absolute inset-0 bg-[var(--opr-navy)]/30" />

          {ready ? (
            <button
              type="button"
              onClick={() => void play()}
              className="group absolute inset-0 flex cursor-pointer items-center justify-center"
              aria-label={cta}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[var(--opr-navy)] shadow-lg transition group-hover:scale-105 sm:h-16 sm:w-16">
                <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M9 6.5v11l8.5-5.5L9 6.5z" />
                </svg>
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
              <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-[var(--opr-navy)]/75 sm:text-sm">
                {ctaSoon}
              </span>
            </div>
          )}

          {ready && isStage && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--opr-navy)]/55 to-transparent px-4 pb-3 pt-8 text-center text-xs font-medium text-white/90">
              {cta}
            </span>
          )}
        </div>
      </div>
      {overlay}
    </>
  );
}
