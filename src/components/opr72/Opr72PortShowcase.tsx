"use client";

import { useState } from "react";
import { opr72Content } from "@/data/opr72-content";
import Opr72VideoPlayer from "./Opr72VideoPlayer";
import Reveal from "./Reveal";

const { portShowcase } = opr72Content;

type PortItem = (typeof portShowcase.items)[number];

function ExternalLinkIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function PresentationIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function PortNavButton({
  item,
  selected,
  onSelect,
  layout,
}: {
  item: PortItem;
  selected: boolean;
  onSelect: () => void;
  layout: "mobile" | "desktop";
}) {
  if (layout === "mobile") {
    const mobileLabel = item.shortLabel;

    return (
      <button
        type="button"
        role="tab"
        aria-selected={selected}
        onClick={onSelect}
        className={`opr-port-nav-grid-item rounded-lg px-2 py-2.5 text-center font-[family-name:var(--font-opr-display)] text-[11px] leading-tight font-bold transition sm:text-xs ${
          selected
            ? "is-active bg-white text-[var(--opr-navy)] shadow-sm"
            : "bg-white/10 text-white/80 active:bg-white/15"
        }`}
      >
        {mobileLabel}
      </button>
    );
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={`opr-port-nav-item group w-full rounded-xl px-4 py-3.5 text-left transition lg:py-3.5 ${
        selected
          ? "is-active bg-white/10 text-white shadow-[inset_3px_0_0_0_var(--opr-sky)]"
          : "text-white/55 hover:bg-white/[0.06] hover:text-white/85"
      }`}
    >
      <span
        className={`block text-[10px] font-bold tracking-[0.14em] uppercase ${
          selected ? "text-[var(--opr-sky-light)]" : "text-white/35"
        }`}
      >
        {item.location}
      </span>
      <span className="mt-0.5 block font-[family-name:var(--font-opr-display)] text-sm font-bold leading-snug sm:text-[0.9375rem]">
        {item.label}
      </span>
    </button>
  );
}

function PortActiveLinks({ active }: { active: PortItem }) {
  return (
    <div className="opr-port-copy-line mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
      {"client" in active && active.client && "clientUrl" in active && active.clientUrl && (
        <a
          href={active.clientUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="opr-port-external-link inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[var(--opr-sky)]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[var(--opr-sky)] shadow-[0_4px_14px_-4px_rgb(61_143_189_/_0.35)] transition hover:border-[var(--opr-sky)]/40 hover:bg-[var(--opr-sky)]/[0.06] hover:shadow-[0_8px_20px_-6px_rgb(61_143_189_/_0.4)] sm:w-fit sm:justify-start"
        >
          <ExternalLinkIcon />
          <span className="truncate">{active.client}</span>
          <span className="hidden font-normal text-[var(--opr-sky)]/65 sm:inline">
            · {portShowcase.externalLinkLabel}
          </span>
        </a>
      )}

      {"presentation" in active && active.presentation && (
        <a
          href={active.presentation.href}
          target="_blank"
          rel="noopener noreferrer"
          className="opr-port-external-link inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[var(--opr-gold)]/25 bg-white px-4 py-2.5 text-sm font-semibold text-[var(--opr-navy)] shadow-[0_4px_14px_-4px_rgb(201_162_39_/_0.25)] transition hover:border-[var(--opr-gold)]/45 hover:bg-[var(--opr-gold)]/[0.06] hover:shadow-[0_8px_20px_-6px_rgb(201_162_39_/_0.3)] sm:w-fit sm:justify-start"
        >
          <PresentationIcon />
          <span>{active.presentation.label ?? portShowcase.cta}</span>
        </a>
      )}
    </div>
  );
}

export default function Opr72PortShowcase() {
  const [activeId, setActiveId] = useState<string>(
    portShowcase.items[0]?.id ?? "",
  );
  const active =
    portShowcase.items.find((item) => item.id === activeId) ??
    portShowcase.items[0];

  if (!active) return null;

  return (
    <div className="opr-port-showcase">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
          {portShowcase.label}
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-opr-display)] text-2xl font-bold text-[var(--opr-navy)] sm:text-3xl">
          {portShowcase.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-[var(--opr-navy)]/70">
          {portShowcase.subtitle}
        </p>
      </Reveal>

      <Reveal className="mt-8 lg:mt-10">
        <div className="opr-port-stage overflow-hidden rounded-2xl shadow-[0_16px_40px_-14px_rgb(7_20_40_/_0.16)] ring-1 ring-[var(--opr-navy)]/10 lg:rounded-[1.75rem] lg:shadow-[0_24px_60px_-12px_rgb(7_20_40_/_0.18)]">
          <nav
            className="opr-port-nav-grid grid grid-cols-2 gap-1.5 border-b border-white/10 bg-[var(--opr-navy)] p-2 lg:hidden"
            role="tablist"
            aria-label="Seleccionar presentación"
          >
            {portShowcase.items.map((item) => (
              <PortNavButton
                key={item.id}
                item={item}
                selected={item.id === active.id}
                onSelect={() => setActiveId(item.id)}
                layout="mobile"
              />
            ))}
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:items-stretch">
            <nav
              className="opr-port-nav hidden gap-1 bg-[var(--opr-navy)] p-4 lg:flex lg:flex-col"
              role="tablist"
              aria-label="Seleccionar presentación"
            >
              {portShowcase.items.map((item) => (
                <PortNavButton
                  key={item.id}
                  item={item}
                  selected={item.id === active.id}
                  onSelect={() => setActiveId(item.id)}
                  layout="desktop"
                />
              ))}
            </nav>

            <div
              role="tabpanel"
              className="opr-port-panel relative flex flex-col bg-gradient-to-br from-white via-white to-[var(--opr-foam)] lg:min-h-full"
            >
              <div className="opr-gradient-patriotic absolute top-0 right-0 left-0 h-1 opacity-90" />

              <div
                key={active.id}
                className="flex flex-col gap-4 px-4 pt-4 pb-5 sm:gap-8 sm:p-7 lg:flex-1 lg:flex-row lg:items-center lg:gap-12 lg:p-8"
              >
                <div className="order-1 flex w-full shrink-0 items-center justify-center lg:order-2 lg:w-[26rem] lg:justify-end">
                  <Opr72VideoPlayer
                    variant="stage"
                    poster={active.poster}
                    posterKey={active.id}
                    video={active.video}
                    cta={portShowcase.cta}
                    ctaSoon={portShowcase.ctaSoon}
                    orientation={
                      active.orientation as "portrait" | "landscape"
                    }
                    className="w-full max-w-[26rem]"
                  />
                </div>

                <div className="opr-port-copy-lines order-2 min-w-0 lg:order-1 lg:flex-1">
                  <p className="opr-port-copy-line flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--opr-navy)]/55">
                    <span className="font-semibold text-[var(--opr-sky)]">
                      {portShowcase.videoNote}
                    </span>
                    <span aria-hidden className="text-[var(--opr-navy)]/25">
                      ·
                    </span>
                    <span>{active.location}</span>
                  </p>

                  <h4 className="opr-port-copy-line mt-2 font-[family-name:var(--font-opr-display)] text-xl font-bold text-[var(--opr-navy)] sm:mt-3 sm:text-[1.75rem] lg:text-3xl">
                    {active.label}
                  </h4>

                  <p className="opr-port-copy-line mt-3 max-w-xl text-sm leading-relaxed text-[var(--opr-navy)]/80 sm:mt-5 sm:text-base">
                    {active.summary}
                  </p>

                  <PortActiveLinks active={active} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
