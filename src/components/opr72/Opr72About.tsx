import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Opr72VideoPlayer from "./Opr72VideoPlayer";
import Reveal from "./Reveal";

const { about, presentation, brand } = opr72Content;

export default function Opr72About() {
  return (
    <section
      id={about.id}
      className="relative z-10 bg-[var(--opr-sand)] pt-[var(--opr-about-pin-pt,5rem)] pb-0 sm:pb-0 lg:pb-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          id="opr72-about-logo"
          className="mb-[var(--opr-about-logo-mb,3.5rem)] flex justify-center"
        >
          <Image
            id="opr72-about-logo-img"
            src={brand.logoStacked}
            alt={`${brand.name} — ${brand.tagline}`}
            width={280}
            height={140}
            className="h-auto w-56 sm:w-64 lg:w-80"
            priority
          />
        </div>

        <Reveal className="mb-4 max-w-3xl lg:mb-0">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
            {about.label}
          </p>
        </Reveal>

        <div className="mt-2 grid gap-x-10 gap-y-8 lg:mt-3 lg:grid-cols-[1fr_minmax(250px,300px)] lg:items-start lg:gap-x-16 lg:gap-y-5">
          <Reveal className="max-w-3xl lg:col-start-1 lg:row-start-1">
            <h2 className="font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl lg:text-[2.75rem]">
              {about.title}
            </h2>
          </Reveal>

          <Reveal
            variant="right"
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-self-end"
          >
            <Opr72VideoPlayer />
            <p className="mt-4 text-center text-sm text-[var(--opr-navy)]/65 lg:text-right">
              {presentation.subtitle}
            </p>
          </Reveal>

          <div className="mt-2 space-y-6 lg:col-start-1 lg:mt-0 lg:row-start-2">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="text-base leading-relaxed text-[var(--opr-navy)]/85 sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
