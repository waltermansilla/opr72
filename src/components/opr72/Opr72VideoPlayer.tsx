"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { opr72Content } from "@/data/opr72-content";

const { presentation } = opr72Content;

type Opr72VideoPlayerProps = {
    className?: string;
};

export default function Opr72VideoPlayer({
    className = "",
}: Opr72VideoPlayerProps) {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const play = useCallback(async () => {
        const video = videoRef.current;
        if (!video) return;

        setPlaying(true);
        video.muted = muted;

        try {
            await video.play();
        } catch {
            /* El usuario puede iniciar con los controles nativos */
        }
    }, [muted]);

    const toggleMute = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        const next = !muted;
        video.muted = next;
        setMuted(next);
    }, [muted]);

    const stop = useCallback(() => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        setPlaying(false);
    }, []);

    return (
        <div
            className={`relative mx-auto w-full max-w-[250px] sm:max-w-[270px] lg:max-w-[300px] ${className}`}
        >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] border-4 border-[var(--opr-navy)]/10 bg-[var(--opr-navy)] shadow-2xl shadow-black/15">
                <video
                    ref={videoRef}
                    src={presentation.video}
                    poster={presentation.poster}
                    className={`absolute inset-0 h-full w-full object-cover ${playing ? "z-10" : "pointer-events-none opacity-0"}`}
                    playsInline
                    muted={muted}
                    controls={playing}
                    onEnded={stop}
                />

                {!playing && (
                    <button
                        type="button"
                        onClick={() => void play()}
                        className="group absolute inset-0 z-20 cursor-pointer"
                        aria-label={presentation.cta}
                    >
                        <Image
                            src={presentation.poster}
                            alt=""
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 250px, (max-width: 1024px) 270px, 300px"
                        />
                        <div className="absolute inset-0 bg-[var(--opr-navy)]/35 transition group-hover:bg-[var(--opr-navy)]/25" />
                        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[var(--opr-navy)] shadow-lg transition group-hover:scale-110">
                                <svg
                                    className="ml-1 h-7 w-7"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                            <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-[var(--opr-navy)]">
                                {presentation.cta}
                            </span>
                        </span>
                    </button>
                )}

                {playing && (
                    <button
                        type="button"
                        onClick={toggleMute}
                        className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/60"
                        aria-label={muted ? "Activar sonido" : "Silenciar"}
                    >
                        {muted ? (
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
