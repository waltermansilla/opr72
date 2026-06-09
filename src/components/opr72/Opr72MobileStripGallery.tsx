"use client";

import Image from "next/image";
import {
  getLoopedSlides,
  useMobilePhotoCarousel,
} from "@/hooks/use-mobile-photo-carousel";

type StripImage = {
  src: string;
  alt: string;
};

type Opr72MobileStripGalleryProps = {
  images: readonly StripImage[];
  autoplayMs?: number;
  className?: string;
  bleed?: boolean;
  showCounter?: boolean;
  compact?: boolean;
  infinite?: boolean;
};

export default function Opr72MobileStripGallery({
  images,
  autoplayMs = 4000,
  className = "",
  bleed = true,
  showCounter = false,
  compact = false,
  infinite = true,
}: Opr72MobileStripGalleryProps) {
  const gapRem = compact ? 0 : 0.5;
  const {
    active,
    trackPos,
    dragOffset,
    viewportRef,
    trackTransform,
    transitionEnabled,
    handleTransitionEnd,
    canLoop,
  } = useMobilePhotoCarousel(images.length, autoplayMs, {
    infinite,
    gapRem,
  });

  const slides = canLoop ? getLoopedSlides(images) : [...images];
  const counter = `${String(active + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
  const trackGap = compact ? "gap-0" : "gap-2";

  return (
    <div
      className={`opr-gallery-mobile lg:hidden ${bleed ? "opr-mobile-gallery-bleed" : ""} ${compact ? "opr-gallery-mobile-compact" : ""} ${className}`}
    >
      <div ref={viewportRef} className="opr-gallery-mobile-viewport overflow-hidden">
        <div
          className={`opr-gallery-mobile-track flex ${trackGap} ${dragOffset !== 0 || !transitionEnabled ? "is-dragging" : ""}`}
          style={{ transform: trackTransform }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="relative aspect-[4/3] w-full shrink-0 bg-[var(--opr-navy)]"
              aria-hidden={canLoop ? i !== trackPos : i !== active}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={item.src === images[0]?.src}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`opr-gallery-mobile-controls px-4 sm:px-6 ${compact ? "bg-transparent px-5 pt-2 pb-4" : "bg-[var(--opr-sand)] pt-3 pb-1"}`}
      >
        <p
          key={active}
          className={`opr-gallery-caption is-active text-center leading-snug text-[var(--opr-navy)]/65 ${compact ? "text-xs" : "text-sm"}`}
        >
          {images[active].alt}
        </p>
        {showCounter && (
          <p className="mt-1 text-center text-xs font-medium tracking-widest text-[var(--opr-navy)]/35">
            {counter}
          </p>
        )}
      </div>
    </div>
  );
}
