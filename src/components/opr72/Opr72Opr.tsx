import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { opr } = opr72Content;

export default function Opr72Opr() {
  return (
    <section id={opr.id} className="relative overflow-hidden py-20 sm:py-28">
      <Image
        src={opr.image}
        alt="Horizonte marítimo argentino"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--opr-navy)]/75 via-[var(--opr-navy)]/55 to-[var(--opr-navy)]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--opr-navy)]/50 via-transparent to-[var(--opr-navy)]/15" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky-light)] uppercase">
            {opr.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {opr.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            {opr.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {opr.blocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 80} variant="up">
              <div className="h-full rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                  {block.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
