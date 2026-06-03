"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { services } = opr72Content;

export default function Opr72Services() {
  const [active, setActive] = useState<string>(services.departments[0].id);
  const panelRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const panels = Object.values(panelRefs.current).filter(Boolean) as HTMLElement[];
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { threshold: [0.25, 0.45, 0.65], rootMargin: "-20% 0px -35% 0px" },
    );

    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  const scrollToDept = (id: string) => {
    panelRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id={services.id} className="bg-white">
      <div className="border-b border-slate-100 bg-[var(--opr-sand)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
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
      </div>

      {/* Mobile: stacked cards */}
      <div className="space-y-0 lg:hidden">
        {services.departments.map((dept, i) => (
          <article
            key={dept.id}
            className={`border-t border-slate-100 px-4 py-12 sm:px-6 ${i % 2 === 0 ? "bg-white" : "bg-[var(--opr-foam)]"}`}
          >
            <span className="text-xs font-bold text-[var(--opr-gold)]">{dept.number}</span>
            <h3 className="mt-2 text-xl font-bold text-[var(--opr-navy)]">{dept.title}</h3>
            <div className="relative mt-6 aspect-video overflow-hidden rounded-xl">
              <Image src={dept.image} alt="" fill className="object-cover" sizes="100vw" />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--opr-navy)]/80">{dept.intro}</p>
            {"listLabel" in dept && dept.listLabel && (
              <p className="mt-4 text-sm font-semibold text-[var(--opr-navy)]">{dept.listLabel}</p>
            )}
            {"items" in dept && dept.items && (
              <ul className="mt-3 space-y-2">
                {dept.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[var(--opr-navy)]/80">
                    <span className="text-[var(--opr-gold)]">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {"sections" in dept &&
              dept.sections?.map((sec) => (
              <div key={sec.title} className="mt-6">
                <h4 className="font-bold text-[var(--opr-navy)]">{sec.title}</h4>
                <ul className="mt-2 space-y-2">
                  {sec.items.map((item) => (
                    <li key={item} className="text-sm text-[var(--opr-navy)]/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {"highlight" in dept && dept.highlight && (
              <p className="mt-6 rounded-xl bg-[var(--opr-navy)]/5 p-4 text-sm font-medium text-[var(--opr-navy)]">
                {dept.highlight}
              </p>
            )}
            {"footnote" in dept && dept.footnote && (
              <p className="mt-4 text-xs text-[var(--opr-navy)]/60 italic">{dept.footnote}</p>
            )}
          </article>
        ))}
      </div>

      {/* Desktop: sticky nav + scrolling panels */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(220px,280px)_1fr]">
        <aside className="opr-services-sticky border-r border-slate-100 bg-[var(--opr-foam)] px-6 py-16 xl:px-10">
          <p className="mb-6 text-xs font-bold tracking-widest text-[var(--opr-navy)]/50 uppercase">
            Departamentos
          </p>
          <nav className="space-y-1">
            {services.departments.map((dept) => (
              <button
                key={dept.id}
                type="button"
                onClick={() => scrollToDept(dept.id)}
                className={`opr-service-nav-btn w-full cursor-pointer border-l-2 py-3 pl-4 text-left text-sm font-semibold ${
                  active === dept.id
                    ? "is-active border-[var(--opr-gold)]"
                    : "border-transparent text-[var(--opr-navy)]/60 hover:text-[var(--opr-navy)]"
                }`}
              >
                <span className="block text-[10px] text-[var(--opr-gold)]">{dept.number}</span>
                {dept.title.replace("Departamento ", "")}
              </button>
            ))}
          </nav>
        </aside>

        <div>
          {services.departments.map((dept, i) => (
            <article
              key={dept.id}
              id={dept.id}
              ref={(el) => {
                panelRefs.current[dept.id] = el;
              }}
              className={`opr-service-panel border-b border-slate-100 px-10 xl:px-16 ${i % 2 === 0 ? "bg-white" : "bg-[var(--opr-foam)]/50"}`}
            >
              <div className="grid w-full items-center gap-12 py-20 xl:grid-cols-2 xl:gap-16">
                <Reveal variant={i % 2 === 0 ? "left" : "right"}>
                  <span className="font-[family-name:var(--font-opr-display)] text-6xl font-bold text-[var(--opr-gold)]/30">
                    {dept.number}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)]">
                    {dept.title}
                  </h3>
                  <p className="mt-6 leading-relaxed text-[var(--opr-navy)]/80">{dept.intro}</p>
                  {"listLabel" in dept && dept.listLabel && (
                    <p className="mt-6 font-semibold text-[var(--opr-navy)]">{dept.listLabel}</p>
                  )}
                  {"items" in dept && dept.items && (
                    <ul className="mt-4 max-h-[40vh] space-y-2 overflow-y-auto pr-2">
                      {dept.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-[var(--opr-navy)]/75"
                        >
                          <span className="shrink-0 text-[var(--opr-gold)]">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {"sections" in dept &&
              dept.sections?.map((sec) => (
                    <div key={sec.title} className="mt-8">
                      <h4 className="font-bold text-[var(--opr-navy)]">{sec.title}</h4>
                      <ul className="mt-3 space-y-2">
                        {sec.items.map((item) => (
                          <li key={item} className="text-sm text-[var(--opr-navy)]/75">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {"highlight" in dept && dept.highlight && (
                    <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium text-[var(--opr-navy)]">
                      {dept.highlight}
                    </p>
                  )}
                  {"footnote" in dept && dept.footnote && (
                    <p className="mt-4 text-xs text-[var(--opr-navy)]/55 italic">
                      {dept.footnote}
                    </p>
                  )}
                </Reveal>

                <Reveal variant={i % 2 === 0 ? "right" : "left"} delay={100}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src={dept.image}
                      alt={dept.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--opr-navy)]/40 to-transparent" />
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
