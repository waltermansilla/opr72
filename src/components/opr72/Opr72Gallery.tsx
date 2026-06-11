"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { gallery } = opr72Content;
const { images } = gallery;

const AUTOPLAY_MS = 3000;
const AUTOPLAY_PAUSE_MS = 6000;
const SWIPE_RATIO = 0.18;
const SWIPE_MIN_PX = 48;

function GalleryArrow({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`opr-gallery-arrow ${isPrev ? "opr-gallery-arrow-prev" : "opr-gallery-arrow-next"} ${className}`}
      aria-label={isPrev ? "Imagen anterior" : "Imagen siguiente"}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isPrev ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

type Opr72GalleryProps = {
  embedded?: boolean;
};

export default function Opr72Gallery({ embedded = false }: Opr72GalleryProps) {
  const [active, setActive] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);
  const mobileViewportRef = useRef<HTMLDivElement>(null);
  const autoplayPausedRef = useRef(false);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayResumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const goTo = useCallback((index: number) => {
    const total = images.length;
    setActive(((index % total) + total) % total);
  }, []);

  const advanceAutoplay = useCallback(() => {
    setActive((current) => (current + 1) % images.length);
  }, []);

  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);

  const scheduleAutoplay = useCallback(() => {
    clearAutoplayTimer();

    const mq = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || reduced.matches || images.length <= 1) return;
    if (autoplayPausedRef.current) return;

    autoplayTimerRef.current = setTimeout(() => {
      if (autoplayPausedRef.current) return;
      advanceAutoplay();
      scheduleAutoplay();
    }, AUTOPLAY_MS);
  }, [advanceAutoplay, clearAutoplayTimer]);

  const pauseAutoplay = useCallback(() => {
    autoplayPausedRef.current = true;
    clearAutoplayTimer();

    if (autoplayResumeRef.current) clearTimeout(autoplayResumeRef.current);
    autoplayResumeRef.current = setTimeout(() => {
      autoplayPausedRef.current = false;
      autoplayResumeRef.current = null;
      scheduleAutoplay();
    }, AUTOPLAY_PAUSE_MS);
  }, [clearAutoplayTimer, scheduleAutoplay]);

  const handleGoPrev = useCallback(() => {
    pauseAutoplay();
    goPrev();
  }, [goPrev, pauseAutoplay]);

  const handleGoNext = useCallback(() => {
    pauseAutoplay();
    goNext();
  }, [goNext, pauseAutoplay]);

  const handleGoTo = useCallback(
    (index: number) => {
      pauseAutoplay();
      goTo(index);
    },
    [goTo, pauseAutoplay],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleGoPrev();
      if (e.key === "ArrowRight") handleGoNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleGoPrev, handleGoNext]);

  useEffect(() => {
    const container = thumbsContainerRef.current;
    const thumb = thumbRefs.current[active];
    if (!container || !thumb) return;

    const targetLeft =
      thumb.offsetLeft - (container.clientWidth - thumb.offsetWidth) / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [active]);

  useEffect(() => {
    scheduleAutoplay();

    return () => {
      clearAutoplayTimer();
      if (autoplayResumeRef.current) clearTimeout(autoplayResumeRef.current);
    };
  }, [clearAutoplayTimer, scheduleAutoplay]);

  useEffect(() => {
    const el = mobileViewportRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let isHorizontal = false;
    let currentOffset = 0;

    const onTouchStart = (e: TouchEvent) => {
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
      const wasHorizontal = isHorizontal;
      tracking = false;

      if (wasHorizontal) {
        pauseAutoplay();

        const threshold = Math.min(el.clientWidth * SWIPE_RATIO, SWIPE_MIN_PX);

        if (currentOffset < -threshold) {
          setActive((current) => (current + 1) % images.length);
        } else if (currentOffset > threshold) {
          setActive((current) => (current - 1 + images.length) % images.length);
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
  }, [pauseAutoplay, images.length]);

  const mobileTrackTransform =
    dragOffset === 0
      ? `translateX(calc(-${active} * (100% + 0.5rem)))`
      : `translateX(calc(-${active} * (100% + 0.5rem) + ${dragOffset}px))`;

  const header = embedded ? (
    <Reveal className="mb-12 max-w-2xl">
      <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
        {gallery.label}
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-opr-display)] text-2xl font-bold text-[var(--opr-navy)] sm:text-3xl">
        {gallery.title}
      </h3>
      {gallery.subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-[var(--opr-navy)]/70">
          {gallery.subtitle}
        </p>
      ) : null}
    </Reveal>
  ) : (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal className="mb-12 text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
          {gallery.label}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl">
          {gallery.title}
        </h2>
        {gallery.subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--opr-navy)]/70">
            {gallery.subtitle}
          </p>
        ) : null}
        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[var(--opr-sky)]" />
      </Reveal>
    </div>
  );

  const wrapperClass = embedded
    ? "opr-gallery opr-gallery-embedded"
    : "bg-[var(--opr-sand)] py-20 sm:py-28";

  const desktopPadding = embedded ? "px-0" : "px-4 sm:px-6 lg:px-8";

  const content = (
    <>
      {header}

      {/* Mobile — ancho completo, autoplay, controles abajo */}
      <Reveal delay={80} className="mt-0 lg:hidden">
        <div className="opr-gallery-mobile opr-mobile-gallery-bleed">
          <div
            ref={mobileViewportRef}
            className="opr-gallery-mobile-viewport overflow-hidden"
          >
            <div
              className={`opr-gallery-mobile-track flex gap-2 ${dragOffset !== 0 ? "is-dragging" : ""}`}
              style={{ transform: mobileTrackTransform }}
            >
              {images.map((item, i) => (
                <div
                  key={item.src}
                  className="relative aspect-[4/3] w-full shrink-0 bg-[var(--opr-navy)]"
                  aria-hidden={i !== active}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="opr-gallery-mobile-controls mx-auto max-w-7xl px-4 pt-4 sm:px-6">
            <div className="flex items-center gap-3">
              <GalleryArrow
                direction="prev"
                onClick={handleGoPrev}
                className="opr-gallery-mobile-arrow shrink-0"
              />
              <div className="flex min-h-11 min-w-0 flex-1 items-center justify-center">
                <p
                  key={active}
                  className="opr-gallery-caption is-active text-center font-[family-name:var(--font-opr-display)] text-base leading-snug font-semibold text-[var(--opr-navy)]"
                >
                  {images[active].alt}
                </p>
              </div>
              <GalleryArrow
                direction="next"
                onClick={handleGoNext}
                className="opr-gallery-mobile-arrow shrink-0"
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Desktop — diseño original */}
      <div className={`mx-auto hidden max-w-7xl lg:block ${desktopPadding}`}>
        <Reveal delay={80}>
          <div className="relative">
            <div className="opr-gallery-stage relative overflow-hidden rounded-2xl bg-[var(--opr-navy)] sm:rounded-3xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9]">
                {images.map((item, i) => (
                  <div
                    key={item.src}
                    className={`opr-gallery-slide absolute inset-0 ${i === active ? "is-active" : ""}`}
                    aria-hidden={i !== active}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority={i === 0}
                    />
                  </div>
                ))}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--opr-navy)]/75 via-[var(--opr-navy)]/10 to-transparent" />

                <div className="absolute right-4 bottom-4 left-4 flex items-end sm:right-6 sm:bottom-6 sm:left-6">
                  <p
                    key={active}
                    className="opr-gallery-caption is-active max-w-2xl font-[family-name:var(--font-opr-display)] text-lg font-semibold text-white sm:text-xl lg:text-2xl"
                  >
                    {images[active].alt}
                  </p>
                </div>
              </div>

              <GalleryArrow
                direction="prev"
                onClick={handleGoPrev}
                className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md sm:left-5 sm:h-12 sm:w-12"
              />

              <GalleryArrow
                direction="next"
                onClick={handleGoNext}
                className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md sm:right-5 sm:h-12 sm:w-12"
              />
            </div>

            <div
              ref={thumbsContainerRef}
              className="mt-5 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-6 sm:gap-4 [&::-webkit-scrollbar]:hidden"
            >
              {images.map((item, i) => (
                <button
                  key={item.src}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => handleGoTo(i)}
                  className={`opr-gallery-thumb relative h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-28 ${
                    i === active ? "is-active" : "opacity-70"
                  }`}
                  aria-label={`Ver ${item.alt}`}
                  aria-current={i === active ? "true" : undefined}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div id={gallery.id} className={wrapperClass}>
        {content}
      </div>
    );
  }

  return (
    <section id={gallery.id} className={wrapperClass}>
      {content}
    </section>
  );
}
