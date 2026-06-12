import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { audience } = opr72Content;

export default function Opr72Vision() {
  return (
    <section
      id={audience.id}
      className="opr-gradient-navy relative py-20 sm:py-28"
    >
      <div className="opr-gradient-patriotic absolute top-0 right-0 left-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center lg:text-left">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky-light)] uppercase">
            {audience.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-white sm:text-4xl">
            {audience.title}
          </h2>
          {audience.intro ? (
            <>
              <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[var(--opr-gold)] lg:mx-0" />
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 lg:mx-0">
                {audience.intro}
              </p>
            </>
          ) : null}
        </Reveal>

        <ul className="opr-audience-list mt-10 lg:mt-12">
          {audience.items.map((item, i) => (
            <Reveal key={item} delay={i * 45} as="li" className="opr-audience-item">
              <div className="opr-audience-chip">
                <span className="opr-audience-chip-mark" aria-hidden />
                <span className="opr-audience-chip-label">{item}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
