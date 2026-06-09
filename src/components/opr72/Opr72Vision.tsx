import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { vision, audience } = opr72Content;

export default function Opr72Vision() {
  return (
    <section
      id={audience.id}
      className="opr-gradient-navy relative py-20 sm:py-28"
    >
      <div className="opr-gradient-patriotic absolute top-0 right-0 left-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:items-start lg:gap-10 xl:gap-14">
          <div className="text-center lg:text-left">
            <Reveal>
              <p className="text-sm font-bold tracking-[0.25em] text-[var(--opr-gold)] uppercase">
                {vision.title}
              </p>
              <blockquote className="mt-6 font-[family-name:var(--font-opr-display)] text-xl leading-snug font-medium text-white sm:mt-8 sm:text-2xl lg:mt-5 lg:text-[1.6rem] lg:leading-snug xl:text-[1.85rem]">
                &ldquo;{vision.text}&rdquo;
              </blockquote>
            </Reveal>
          </div>

          <div className="mt-14 border-t border-white/10 pt-14 text-center lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 lg:text-left xl:pl-14">
            <Reveal>
              <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky-light)] uppercase">
                {audience.label}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-white sm:text-4xl">
                {audience.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                {audience.intro}
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:gap-3.5">
              {audience.items.map((item, i) => (
                <Reveal key={item} delay={i * 50} as="li">
                  <div className="opr-card-lift flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-left backdrop-blur-sm">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--opr-gold)]"
                      aria-hidden
                    />
                    <span className="text-sm font-semibold text-white/90">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
