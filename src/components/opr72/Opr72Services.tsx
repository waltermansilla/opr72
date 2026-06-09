"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { opr72Content } from "@/data/opr72-content";

const { services } = opr72Content;

type Department = (typeof services.departments)[number];

function deptShortTitle(title: string) {
  return title.replace(/^Departamento\s+/i, "");
}

function DeptModalContent({ dept }: { dept: Department }) {
  return (
    <div className="opr-dept-modal-body space-y-5 px-5 py-6 sm:px-6 sm:py-6">
      <p className="text-[0.9375rem] leading-relaxed text-[var(--opr-navy)]/88 sm:text-base">
        {dept.intro}
      </p>

      {"listLabel" in dept && dept.listLabel && (
        <p className="text-sm font-semibold tracking-wide text-[var(--opr-navy)]">
          {dept.listLabel}
        </p>
      )}
      {"items" in dept && dept.items && (
        <ul className="space-y-2.5">
          {dept.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl bg-[var(--opr-foam)] px-3.5 py-3 text-sm leading-relaxed text-[var(--opr-navy)]/88"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--opr-sky)]/12 text-[10px] font-bold text-[var(--opr-sky)]">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {"sections" in dept &&
        dept.sections?.map((sec) => (
          <div
            key={sec.title}
            className="rounded-2xl border border-[var(--opr-navy)]/6 bg-white p-4"
          >
            <h4 className="text-sm font-bold text-[var(--opr-navy)] sm:text-base">
              {sec.title}
            </h4>
            <ul className="mt-2.5 space-y-2">
              {sec.items.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-[var(--opr-navy)]/82 sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      {"highlight" in dept && dept.highlight && (
        <p className="rounded-2xl border border-[var(--opr-sky)]/20 bg-[var(--opr-sky)]/8 p-4 text-sm font-medium leading-relaxed text-[var(--opr-navy)]">
          {dept.highlight}
        </p>
      )}
      {"footnote" in dept && dept.footnote && (
        <p className="text-xs leading-relaxed text-[var(--opr-navy)]/50 italic sm:text-sm">
          {dept.footnote}
        </p>
      )}
    </div>
  );
}

const MODAL_CLOSE_MS = 360;

function getAdjacentDepts(deptId: string) {
  const list = services.departments;
  const index = list.findIndex((d) => d.id === deptId);
  if (index === -1) return { prev: null, next: null };

  const prev = list[(index - 1 + list.length) % list.length];
  const next = list[(index + 1) % list.length];
  return { prev, next };
}

function DeptModalArrowIcon({
  direction,
  className = "h-5 w-5",
}: {
  direction: "prev" | "next";
  className?: string;
}) {
  const isPrev = direction === "prev";

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      {isPrev ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}

function DeptModalNavButton({
  dept,
  direction,
  onClick,
  className = "",
}: {
  dept: Department;
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const title = deptShortTitle(dept.title);
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`opr-dept-modal-nav group hidden sm:flex ${isPrev ? "opr-dept-modal-nav-prev" : "opr-dept-modal-nav-next"} ${className}`}
      aria-label={`${isPrev ? "Departamento anterior" : "Departamento siguiente"}: ${title}`}
    >
      <span className="opr-dept-modal-nav-icon" aria-hidden>
        <DeptModalArrowIcon direction={direction} />
      </span>
      <span className="line-clamp-2 leading-snug">{title}</span>
    </button>
  );
}

function DeptModalMobileNavButton({
  dept,
  direction,
  onClick,
  disabled = false,
}: {
  dept: Department;
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const title = deptShortTitle(dept.title);
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="opr-dept-modal-mobile-nav-btn group flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 transition enabled:active:scale-[0.98] enabled:active:bg-[var(--opr-navy)]/5 disabled:opacity-35"
      aria-label={`${isPrev ? "Departamento anterior" : "Departamento siguiente"}: ${title}`}
    >
      <DeptModalArrowIcon
        direction={direction}
        className="h-4 w-4 shrink-0 text-[var(--opr-sky)]"
      />
      <span className="line-clamp-2 text-center text-[10px] leading-tight font-medium text-[var(--opr-navy)]/65">
        {title}
      </span>
    </button>
  );
}

function DeptModal({
  deptId,
  onClose,
  onNavigate,
}: {
  deptId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const navigateRef = useRef(onNavigate);
  navigateRef.current = onNavigate;
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closeOnImage, setCloseOnImage] = useState(true);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const deptRef = useRef<Department | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const dept =
    deptId !== null
      ? services.departments.find((d) => d.id === deptId) ?? null
      : deptRef.current;

  const adjacent = deptId ? getAdjacentDepts(deptId) : { prev: null, next: null };

  useEffect(() => {
    if (deptId) {
      const next = services.departments.find((d) => d.id === deptId) ?? null;
      if (next) deptRef.current = next;
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), MODAL_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [deptId]);

  useEffect(() => {
    if (deptId && contentRef.current) {
      contentRef.current.scrollTop = 0;
      setCloseOnImage(true);
    }
  }, [deptId]);

  useEffect(() => {
    const scrollEl = contentRef.current;
    const heroEl = heroRef.current;
    if (!scrollEl || !heroEl || !mounted) return;

    const updateCloseContrast = () => {
      const threshold = heroEl.offsetHeight - 52;
      setCloseOnImage(scrollEl.scrollTop < threshold);
    };

    updateCloseContrast();
    scrollEl.addEventListener("scroll", updateCloseContrast, { passive: true });
    window.addEventListener("resize", updateCloseContrast);

    return () => {
      scrollEl.removeEventListener("scroll", updateCloseContrast);
      window.removeEventListener("resize", updateCloseContrast);
    };
  }, [deptId, mounted]);

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (!deptId) return;
      const { prev, next } = getAdjacentDepts(deptId);
      if (e.key === "ArrowLeft" && prev) navigateRef.current(prev.id);
      if (e.key === "ArrowRight" && next) navigateRef.current(next.id);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, deptId]);

  if (!mounted || !dept || !portalTarget) return null;

  const goPrev = () => adjacent.prev && onNavigate(adjacent.prev.id);
  const goNext = () => adjacent.next && onNavigate(adjacent.next.id);
  const title = deptShortTitle(dept.title);
  const deptNumber = "number" in dept ? dept.number : null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3.5 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Departamento ${title}`}
    >
      <button
        type="button"
        className={`opr-modal-backdrop opr-dept-modal-backdrop absolute inset-0 bg-[var(--opr-navy)]/70 backdrop-blur-md sm:bg-[var(--opr-navy)]/60 sm:backdrop-blur-sm ${visible ? "is-open" : ""}`}
        aria-label="Cerrar"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full w-full max-h-[calc(100dvh-1.75rem)] items-center justify-center sm:h-auto sm:max-h-none sm:w-auto">
        <div className="flex h-full w-full items-stretch sm:h-auto sm:w-auto sm:items-center sm:justify-center sm:gap-4">
          {adjacent.prev && (
            <DeptModalNavButton
              dept={adjacent.prev}
              direction="prev"
              onClick={goPrev}
            />
          )}

          <div
            className={`opr-modal-panel opr-dept-modal-panel relative flex h-full max-h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_56px_rgba(7,20,40,0.22)] sm:h-[min(88dvh,780px)] sm:max-h-[88dvh] sm:w-[min(calc(100vw-12rem),42rem)] sm:max-w-2xl sm:shrink-0 lg:w-[min(calc(100vw-14rem),48rem)] lg:max-w-3xl ${visible ? "is-open" : ""}`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-[background-color,border-color,color,box-shadow] duration-200 active:scale-95 sm:top-4 sm:right-4 ${
                closeOnImage
                  ? "border border-white/35 bg-black/35 text-white hover:bg-black/50"
                  : "border border-[var(--opr-navy)]/12 bg-white/95 text-[var(--opr-navy)] shadow-[0_2px_10px_rgba(7,20,40,0.1)] hover:bg-white"
              }`}
              aria-label="Cerrar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              ref={contentRef}
              className="opr-dept-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white [-webkit-overflow-scrolling:touch]"
            >
              <div ref={heroRef} className="relative shrink-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--opr-navy)] sm:aspect-[2/1]">
                  <Image
                    src={dept.image}
                    alt={dept.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                  />
                </div>
              </div>

              <div className="border-b border-[var(--opr-navy)]/8 px-4 py-3.5 sm:px-6 sm:py-4">
                <div className="min-w-0">
                  {deptNumber && (
                    <span className="inline-flex rounded-full bg-[var(--opr-sky)]/12 px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] text-[var(--opr-sky)] uppercase sm:text-[11px]">
                      Dept. {deptNumber}
                    </span>
                  )}
                  <h3 className="mt-1 font-[family-name:var(--font-opr-display)] text-xl leading-tight font-bold text-[var(--opr-navy)] sm:mt-1.5 sm:text-2xl">
                    {title}
                  </h3>
                </div>
              </div>

              <DeptModalContent key={dept.id} dept={dept} />
            </div>

            {/* Mobile footer nav — fijo abajo */}
            <div className="shrink-0 border-t border-[var(--opr-navy)]/8 bg-white px-3 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
              <div className="flex items-stretch gap-1 rounded-xl bg-[var(--opr-foam)] p-1">
                <DeptModalMobileNavButton
                  dept={adjacent.prev ?? dept}
                  direction="prev"
                  onClick={goPrev}
                  disabled={!adjacent.prev}
                />
                <div className="my-1.5 w-px shrink-0 bg-[var(--opr-navy)]/10" aria-hidden />
                <DeptModalMobileNavButton
                  dept={adjacent.next ?? dept}
                  direction="next"
                  onClick={goNext}
                  disabled={!adjacent.next}
                />
              </div>
            </div>
          </div>

          {adjacent.next && (
            <DeptModalNavButton
              dept={adjacent.next}
              direction="next"
              onClick={goNext}
            />
          )}
        </div>
      </div>
    </div>,
    portalTarget,
  );
}

function DeptAccordionItem({
  dept,
  isOpen,
  onToggle,
  onOpenModal,
}: {
  dept: Department;
  isOpen: boolean;
  onToggle: () => void;
  onOpenModal: () => void;
}) {
  const title = deptShortTitle(dept.title);

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--opr-navy)]/8 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
      >
        <h3 className="font-[family-name:var(--font-opr-display)] text-base font-bold text-[var(--opr-navy)]">
          {title}
        </h3>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--opr-sky)]/12 text-[var(--opr-sky)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--opr-navy)]/8 px-4 pb-4">
            <div className="relative mt-4 aspect-[2/1] w-full overflow-hidden rounded-xl">
              <Image
                src={dept.image}
                alt={dept.title}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--opr-navy)]/75">
              {dept.description}
            </p>
            <button
              type="button"
              onClick={onOpenModal}
              className="mt-4 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[var(--opr-sky)]/35 bg-[var(--opr-sky)]/12 px-5 py-2 text-sm font-semibold text-[var(--opr-navy)] transition active:scale-[0.98] active:bg-[var(--opr-sky)]/18"
            >
              Ver más
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function DeptCard({
  dept,
  onOpenModal,
}: {
  dept: Department;
  onOpenModal: () => void;
}) {
  const title = deptShortTitle(dept.title);

  return (
    <article className="opr-dept-card flex h-full min-w-[min(300px,82vw)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[var(--opr-navy)]/8 bg-white shadow-sm lg:min-w-0">
      <div className="opr-dept-card-media relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={dept.image}
          alt={dept.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 82vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-[family-name:var(--font-opr-display)] text-lg font-bold text-[var(--opr-navy)] sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--opr-navy)]/75">
          {dept.description}
        </p>
        <button
          type="button"
          onClick={onOpenModal}
          className="mt-4 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[var(--opr-navy)]/20 px-5 py-2 text-sm font-semibold text-[var(--opr-navy)] transition hover:border-[var(--opr-sky)]/35 hover:bg-[var(--opr-sky)]/12 active:scale-[0.98]"
        >
          Ver más
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default function Opr72Services() {
  const [modalDeptId, setModalDeptId] = useState<string | null>(null);
  const [expandedDeptId, setExpandedDeptId] = useState<string | null>("capacitacion");

  const handleOpenModal = useCallback((id: string) => {
    setModalDeptId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalDeptId(null);
  }, []);

  const handleNavigateModal = useCallback((id: string) => {
    setModalDeptId(id);
  }, []);

  return (
    <section id={services.id} className="bg-[var(--opr-foam)] pt-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pb-10 text-center sm:pb-12">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
            {services.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl lg:text-5xl">
            {services.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--opr-navy)]/75">
            {services.intro}
          </p>
        </div>

        <div className="space-y-3 pb-16 lg:hidden">
          {services.departments.map((dept) => (
            <DeptAccordionItem
              key={dept.id}
              dept={dept}
              isOpen={expandedDeptId === dept.id}
              onToggle={() =>
                setExpandedDeptId((current) => (current === dept.id ? null : dept.id))
              }
              onOpenModal={() => handleOpenModal(dept.id)}
            />
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:pb-16">
          {services.departments.map((dept) => (
            <DeptCard
              key={dept.id}
              dept={dept}
              onOpenModal={() => handleOpenModal(dept.id)}
            />
          ))}
        </div>
      </div>

      <DeptModal
        deptId={modalDeptId}
        onClose={handleCloseModal}
        onNavigate={handleNavigateModal}
      />
    </section>
  );
}
