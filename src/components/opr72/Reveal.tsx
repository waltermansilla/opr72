"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale";

const variantClass: Record<RevealVariant, string> = {
  up: "opr-reveal",
  left: "opr-reveal-left",
  right: "opr-reveal-right",
  scale: "opr-reveal-scale",
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      {
        threshold: isMobile ? 0.08 : 0.12,
        rootMargin: isMobile ? "0px 0px -4% 0px" : "0px 0px -40px 0px",
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as never}
      className={`${variantClass[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
