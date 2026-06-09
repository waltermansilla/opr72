import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { institutional } = opr72Content;

function ExternalLinkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

export default function Opr72Institutional() {
  return (
    <section id={institutional.id} className="bg-[var(--opr-sand)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
            {institutional.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl">
            {institutional.title}
          </h2>
          <p className="mt-4 text-[var(--opr-navy)]/75">{institutional.intro}</p>
        </Reveal>

        <div className="mt-8 grid gap-2.5 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {institutional.links.map((link, i) => {
            const imageClass =
              "imageClass" in link && link.imageClass ? link.imageClass : "object-center";

            return (
              <Reveal key={link.url} delay={i * 70}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--opr-navy)]/8 bg-white p-2.5 shadow-sm transition hover:border-[var(--opr-navy)]/15 hover:shadow-md lg:hidden">
                    <div className="relative h-14 w-[4.25rem] shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={link.image}
                        alt=""
                        fill
                        className={`object-cover ${imageClass}`}
                        sizes="68px"
                      />
                    </div>
                    <span className="min-w-0 flex-1 text-sm font-bold leading-snug text-[var(--opr-navy)]">
                      {link.title}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--opr-foam)] text-[var(--opr-navy)] transition group-hover:bg-[var(--opr-sky)]/15">
                      <ExternalLinkIcon />
                    </span>
                  </div>

                  <div className="opr-card-lift relative hidden aspect-[16/10] lg:flex lg:flex-col lg:justify-end overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={link.image}
                      alt={link.title}
                      fill
                      className={`object-cover ${imageClass} transition-transform duration-500 group-hover:scale-110`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--opr-navy)] via-[var(--opr-navy)]/45 to-[var(--opr-navy)]/10" />
                    <div className="relative z-10 flex items-end justify-between gap-3 p-4 sm:p-5">
                      <span className="text-base font-bold text-white sm:text-lg">
                        {link.title}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition group-hover:bg-white/25">
                        {institutional.visitLabel}
                        <ExternalLinkIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
