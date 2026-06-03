import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { audience } = opr72Content;

export default function Opr72Audience() {
  return (
    <section id={audience.id} className="bg-[var(--opr-foam)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
            {audience.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl">
            {audience.title}
          </h2>
          <p className="mt-4 text-base text-[var(--opr-navy)]/75">{audience.intro}</p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {audience.items.map((item, i) => (
            <Reveal key={item} delay={i * 60} as="li">
              <div className="opr-card-lift flex h-full items-center gap-4 rounded-2xl border border-[var(--opr-navy)]/8 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--opr-navy)] text-sm font-bold text-[var(--opr-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold text-[var(--opr-navy)]">{item}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
