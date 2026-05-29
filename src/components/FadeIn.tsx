"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fade-in al entrar en pantalla (IntersectionObserver).
 * Sin animation-timeline: view() — en Safari móvil provoca saltos de scroll.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    el.style.setProperty("--fade-delay", `${delay}ms`);

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      el.classList.remove("fade-in-wait");
      el.classList.add("fade-in-play");
    };

    el.classList.add("fade-in-wait");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0.08, rootMargin: "0px 0px 40px 0px" },
    );

    observer.observe(el);

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        play();
      }
    });

    const fallback = window.setTimeout(play, 500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in-el ${className}`}>
      {children}
    </div>
  );
}
