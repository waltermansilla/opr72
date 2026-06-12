import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { about, brand, vision } = opr72Content;

export default function Opr72About() {
  return (
    <section
      id={about.id}
      className="relative bg-[var(--opr-sand)] pt-16 pb-10 sm:pb-14 lg:pt-20 lg:pb-0"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex justify-center lg:mb-12">
          <Image
            src={brand.logoStacked}
            alt={`${brand.name} — ${brand.tagline}`}
            width={280}
            height={140}
            className="h-auto w-56 sm:w-64 lg:w-80"
            priority
          />
        </div>
      </div>

      <div
        id="opr72-about-body"
        className="opr-about-body relative mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(22rem,1fr)_minmax(280px,min(40vw,560px))] lg:items-stretch lg:gap-x-10 lg:px-8 xl:gap-x-16"
      >
        <div className="opr-about-body-copy relative z-10 min-w-0 lg:col-start-1 lg:max-w-[44rem] lg:pb-20 xl:pb-24">
          <h2 className="text-balance font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl lg:text-[2.75rem]">
            {about.title}
          </h2>

          <Reveal className="mt-6 lg:hidden">
            <div className="opr-mobile-gallery-bleed relative aspect-[4/3] overflow-hidden">
              <Image
                src={about.imageSide}
                alt={about.imageSideAlt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </Reveal>

          <div className="mt-6 space-y-6 sm:mt-8">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="text-base leading-relaxed text-[var(--opr-navy)]/85 sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 border-t border-[var(--opr-navy)]/10 pt-10 sm:mt-14 sm:pt-12">
            <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
              {vision.title}
            </p>
            <blockquote className="mt-4 font-[family-name:var(--font-opr-display)] text-xl leading-relaxed font-medium text-[var(--opr-navy)] sm:mt-5 sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
              &ldquo;{vision.text}&rdquo;
            </blockquote>
          </Reveal>
        </div>

        <div
          className="opr-about-body-visual-col relative hidden min-h-px self-stretch lg:col-start-2 lg:block"
          aria-hidden
        >
          <aside className="opr-about-body-visual pointer-events-none">
            <div className="opr-about-body-visual-panel">
              <Image
                src={about.imageSide}
                alt={about.imageSideAlt}
                fill
                className="opr-about-side-image"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
