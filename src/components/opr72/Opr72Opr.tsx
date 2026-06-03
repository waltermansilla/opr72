import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { opr } = opr72Content;

export default function Opr72Opr() {
  return (
    <section id={opr.id} className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
              {opr.label}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl">
              {opr.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--opr-navy)]/80">
              {opr.lead}
            </p>
            <div className="mt-10 space-y-6">
              {opr.blocks.map((block, i) => (
                <Reveal key={block.title} delay={i * 80} variant="left">
                  <div className="border-l-4 border-[var(--opr-sky)] pl-5">
                    <h3 className="text-lg font-bold text-[var(--opr-navy)]">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--opr-navy)]/75 sm:text-base">
                      {block.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl lg:sticky lg:top-28">
              <Image
                src={opr.image}
                alt="Horizonte marítimo argentino"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--opr-navy)]/80 to-transparent" />
              <div className="absolute right-6 bottom-6 left-6 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
                  República Argentina
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Autoridad Marítima · Prefectura Naval · Fuerzas Armadas
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
