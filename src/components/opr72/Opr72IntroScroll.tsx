"use client";

import { useEffect, useRef } from "react";
import { opr72Content } from "@/data/opr72-content";
import Opr72Hero from "./Opr72Hero";
import Opr72Stats from "./Opr72Stats";

type PinMetrics = {
  pinnedHeight: number;
  triggerScroll: number;
  pinDistance: number;
  fixedTop: number;
  statsTopInPinned: number;
  statsHeight: number;
  statsContentHeight: number;
  logoPaddingTop: number;
  logoWidth: number;
  logoHeight: number;
  logoLeft: number;
};

const MIN_GAP_STATS_TO_HEADING = 50;
const ABOUT_LOGO_IMG_ID = "opr72-about-logo-img";
const STATS_CONTENT_ID = "opr72-stats-content";
const NAVBAR_ID = "opr72-navbar";

function getNavbarHeight() {
  const header = document.getElementById(NAVBAR_ID);
  return header?.offsetHeight ?? 64;
}

function getAboutLogoImg() {
  return document.getElementById(ABOUT_LOGO_IMG_ID) as HTMLImageElement | null;
}

function getStatsContentEl() {
  return document.getElementById(STATS_CONTENT_ID);
}

function resetStatsContent() {
  const el = getStatsContentEl();
  if (el) {
    el.style.transform = "";
    el.style.willChange = "";
  }
}

export default function Opr72IntroScroll() {
  const pinnedRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const whiteImgRef = useRef<HTMLImageElement>(null);
  const metricsRef = useRef<PinMetrics | null>(null);
  const enabledRef = useRef(false);
  const measureRafRef = useRef(0);
  const pinActiveRef = useRef(false);
  const lastPinnedTopRef = useRef<number | null>(null);
  const lastViewportWidthRef = useRef(0);

  const resetPinned = (pinnedEl: HTMLDivElement, placeholderEl: HTMLDivElement) => {
    resetStatsContent();
    if (pinActiveRef.current) {
      pinnedEl.style.position = "";
      pinnedEl.style.top = "";
      pinnedEl.style.left = "";
      pinnedEl.style.right = "";
      pinnedEl.style.width = "";
      pinnedEl.style.zIndex = "";
      pinnedEl.style.willChange = "";
      pinnedEl.style.transform = "";
      placeholderEl.style.height = "0";
      pinActiveRef.current = false;
      lastPinnedTopRef.current = null;
      document.documentElement.removeAttribute("data-opr-pin-active");
    }
  };

  const applyScroll = () => {
    const pinnedEl = pinnedRef.current;
    const placeholderEl = placeholderRef.current;
    const whiteOverlayEl = whiteOverlayRef.current;
    const whiteImgEl = whiteImgRef.current;
    const metrics = metricsRef.current;

    if (!pinnedEl || !placeholderEl) return;

    if (!enabledRef.current || !metrics) {
      resetPinned(pinnedEl, placeholderEl);
      if (whiteOverlayEl) {
        whiteOverlayEl.style.opacity = "0";
        whiteOverlayEl.style.visibility = "hidden";
      }
      resetStatsContent();
      return;
    }

    const { triggerScroll, pinDistance, fixedTop, pinnedHeight } = metrics;
    const scrollY = window.scrollY;
    const endScroll = triggerScroll + pinDistance;

    if (scrollY < triggerScroll) {
      resetPinned(pinnedEl, placeholderEl);
      if (whiteOverlayEl) {
        whiteOverlayEl.style.opacity = "0";
        whiteOverlayEl.style.visibility = "hidden";
      }
      return;
    }

    const releaseOffset = scrollY - endScroll;
    const top = scrollY < endScroll ? fixedTop : fixedTop - releaseOffset;
    const stillVisible = top + pinnedHeight > 0;

    if (!stillVisible) {
      resetPinned(pinnedEl, placeholderEl);
      if (whiteOverlayEl) {
        whiteOverlayEl.style.opacity = "0";
        whiteOverlayEl.style.visibility = "hidden";
      }
      return;
    }

    if (!pinActiveRef.current) {
      placeholderEl.style.height = `${pinnedHeight}px`;
      pinnedEl.style.position = "fixed";
      pinnedEl.style.top = "0";
      pinnedEl.style.left = "0";
      pinnedEl.style.right = "0";
      pinnedEl.style.width = "100%";
      pinnedEl.style.zIndex = "30";
      pinnedEl.style.willChange = "transform";
      pinnedEl.style.transform = "translate3d(0, 0, 0)";
      pinActiveRef.current = true;
      document.documentElement.setAttribute("data-opr-pin-active", "");
    }

    const roundedTop = Math.round(top);
    if (lastPinnedTopRef.current !== roundedTop) {
      pinnedEl.style.transform = `translate3d(0, ${roundedTop}px, 0)`;
      lastPinnedTopRef.current = roundedTop;
    }

    const {
      statsTopInPinned,
      statsHeight,
      logoPaddingTop,
      logoWidth,
      logoHeight,
      logoLeft,
    } = metrics;

    const pinScroll = Math.max(0, scrollY - triggerScroll);

    const statsContentEl = getStatsContentEl();
    if (statsContentEl) {
      statsContentEl.style.transform = `translate3d(0, ${-pinScroll}px, 0)`;
    }

    const statsTop = roundedTop + statsTopInPinned;
    const logoTop = pinnedHeight + logoPaddingTop - scrollY;
    const overlapTop = Math.max(statsTop, logoTop);
    const overlapBottom = Math.min(statsTop + statsHeight, logoTop + logoHeight);
    const overlapHeight = overlapBottom - overlapTop;

    if (!whiteOverlayEl || !whiteImgEl) return;

    if (overlapHeight < 1) {
      whiteOverlayEl.style.opacity = "0";
      whiteOverlayEl.style.visibility = "hidden";
      return;
    }

    whiteOverlayEl.style.visibility = "visible";
    whiteOverlayEl.style.opacity = "1";
    whiteOverlayEl.style.transform = `translate3d(0, ${Math.round(statsTop)}px, 0)`;
    whiteOverlayEl.style.width = "100%";
    whiteOverlayEl.style.height = `${statsHeight}px`;

    whiteImgEl.style.width = `${logoWidth}px`;
    whiteImgEl.style.height = `${logoHeight}px`;
    whiteImgEl.style.transform = `translate3d(${Math.round(logoLeft)}px, ${Math.round(logoTop - statsTop)}px, 0)`;
  };

  const onScroll = () => {
    applyScroll();
  };

  const measure = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduced) {
      document.documentElement.style.removeProperty("--opr-about-pin-pt");
      document.documentElement.style.removeProperty("--opr-about-logo-mb");
      metricsRef.current = null;
      enabledRef.current = false;
      applyScroll();
      return;
    }

    const pinnedEl = pinnedRef.current;
    const statsEl = statsRef.current;

    if (!pinnedEl || !statsEl) {
      metricsRef.current = null;
      enabledRef.current = false;
      applyScroll();
      return;
    }

    const pinnedHeight = pinnedEl.offsetHeight;
    const statsTopInPinned = statsEl.offsetTop - pinnedEl.offsetTop;
    const statsHeight = statsEl.offsetHeight;
    const headerBottom = getNavbarHeight();
    const fixedTop = headerBottom - statsTopInPinned;
    const triggerScroll = Math.max(0, statsTopInPinned - headerBottom);

    const pinDistance = Math.max(
      1,
      pinnedHeight - triggerScroll - fixedTop - statsTopInPinned,
    );

    const statsContentEl = getStatsContentEl();
    const statsContentHeight = statsContentEl?.offsetHeight ?? 0;

    const logoImg = getAboutLogoImg();
    const logoHeight = logoImg?.offsetHeight ?? 0;
    const logoWidth = logoImg?.offsetWidth ?? 0;
    const logoLeft = logoImg?.getBoundingClientRect().left ?? 0;
    const logoPaddingTop = Math.max(0, statsHeight / 2 - logoHeight / 2);
    const logoMarginBottom = Math.max(
      0,
      MIN_GAP_STATS_TO_HEADING + statsHeight / 2 - logoHeight / 2,
    );

    document.documentElement.style.setProperty(
      "--opr-about-pin-pt",
      `${logoPaddingTop}px`,
    );
    document.documentElement.style.setProperty(
      "--opr-about-logo-mb",
      `${logoMarginBottom}px`,
    );

    metricsRef.current = {
      pinnedHeight,
      triggerScroll,
      pinDistance,
      fixedTop,
      statsTopInPinned,
      statsHeight,
      statsContentHeight,
      logoPaddingTop,
      logoWidth,
      logoHeight,
      logoLeft,
    };
    enabledRef.current = true;
    pinnedEl.style.willChange = "transform";
    if (statsContentEl) statsContentEl.style.willChange = "transform";
    applyScroll();
  };

  const scheduleMeasure = () => {
    if (measureRafRef.current) return;
    measureRafRef.current = requestAnimationFrame(() => {
      measureRafRef.current = 0;
      const width = window.innerWidth;
      const widthChanged = width !== lastViewportWidthRef.current;
      lastViewportWidthRef.current = width;

      if (pinActiveRef.current && !widthChanged) {
        applyScroll();
        return;
      }

      measure();
    });
  };

  useEffect(() => {
    lastViewportWidthRef.current = window.innerWidth;
    const id = requestAnimationFrame(measure);

    const onResize = () => scheduleMeasure();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", scheduleMeasure);
    window.addEventListener("scroll", onScroll, { passive: true });

    const pinnedEl = pinnedRef.current;
    const ro = new ResizeObserver(scheduleMeasure);
    if (pinnedEl) ro.observe(pinnedEl);

    const statsEl = statsRef.current;
    if (statsEl) ro.observe(statsEl);

    const logoImg = getAboutLogoImg();
    if (logoImg) ro.observe(logoImg);

    const statsContentEl = getStatsContentEl();
    if (statsContentEl) ro.observe(statsContentEl);

    const navbarEl = document.getElementById(NAVBAR_ID);
    if (navbarEl) ro.observe(navbarEl);

    applyScroll();

    return () => {
      cancelAnimationFrame(id);
      if (measureRafRef.current) cancelAnimationFrame(measureRafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", scheduleMeasure);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      document.documentElement.style.removeProperty("--opr-about-pin-pt");
      document.documentElement.style.removeProperty("--opr-about-logo-mb");
      document.documentElement.removeAttribute("data-opr-pin-active");
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={placeholderRef}
        aria-hidden
        className="pointer-events-none"
        style={{ height: 0 }}
      />
      <div ref={pinnedRef}>
        <Opr72Hero />
        <div ref={statsRef}>
          <Opr72Stats />
        </div>
      </div>

      <div
        ref={whiteOverlayRef}
        aria-hidden
        className="opr-pin-white-overlay pointer-events-none fixed top-0 left-0 z-[31] overflow-hidden"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={whiteImgRef}
          src={opr72Content.brand.logoStacked}
          alt=""
          className="absolute top-0 left-0 max-w-none brightness-0 invert will-change-transform"
        />
      </div>
    </div>
  );
}
