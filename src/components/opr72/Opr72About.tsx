import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { about, brand } = opr72Content;

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
        className="opr-about-body relative mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,46vw)] lg:gap-x-14 lg:px-8 xl:gap-x-20"
      >
        <div className="relative z-10 min-w-0 lg:max-w-[42rem] lg:pb-20 xl:pb-24">
          <Reveal className="mb-4">
            <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
              {about.label}
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl lg:text-[2.75rem]">
              {about.title}
            </h2>
          </Reveal>

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

          <div className="mt-8 space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="text-base leading-relaxed text-[var(--opr-navy)]/85 sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div
          className="opr-about-body-visual-spacer hidden lg:block"
          aria-hidden
        />

        <aside
          className="opr-about-body-visual pointer-events-none hidden lg:block"
          aria-hidden
        >
          <div className="opr-about-body-visual-panel">
            <Image
              src={about.imageSide}
              alt={about.imageSideAlt}
              fill
              className="opr-about-side-image"
              sizes="46vw"
              priority
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
