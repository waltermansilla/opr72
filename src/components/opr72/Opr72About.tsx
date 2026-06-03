import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { about } = opr72Content;

export default function Opr72About() {
  return (
    <section id={about.id} className="bg-[var(--opr-sand)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
                {about.label}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl lg:text-[2.75rem]">
                {about.title}
              </h2>
            </Reveal>
            <Reveal variant="left" delay={120} className="relative mt-8 aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={about.imageMain}
                alt="Operaciones portuarias"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
            <Reveal
              variant="scale"
              delay={200}
              className="relative -mt-16 ml-auto mr-4 hidden aspect-video w-2/3 overflow-hidden rounded-xl border-4 border-[var(--opr-sand)] shadow-xl lg:block"
            >
              <Image
                src={about.imageSecondary}
                alt="Vista del puerto"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </Reveal>
          </div>

          <div className="space-y-6">
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
