import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

export default function Opr72Vision() {
  const { vision } = opr72Content;

  return (
    <section className="opr-gradient-navy relative py-20 sm:py-28">
      <div className="opr-gradient-patriotic absolute top-0 right-0 left-0" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold tracking-[0.25em] text-[var(--opr-gold)] uppercase">
            {vision.title}
          </p>
          <blockquote className="mt-8 font-[family-name:var(--font-opr-display)] text-2xl leading-snug font-medium text-white sm:text-3xl lg:text-4xl">
            &ldquo;{vision.text}&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
