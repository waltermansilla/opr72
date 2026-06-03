import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

export default function Opr72Stats() {
  return (
    <section className="opr-gradient-navy relative py-14 sm:py-16">
      <div className="opr-gradient-patriotic absolute top-0 right-0 left-0" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:gap-12 lg:px-8">
        {opr72Content.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80} className="text-center">
            <p className="font-[family-name:var(--font-opr-display)] text-4xl font-bold text-[var(--opr-gold)] sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-snug text-white/75">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
