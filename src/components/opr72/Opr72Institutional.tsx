import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { institutional } = opr72Content;

export default function Opr72Institutional() {
  return (
    <section id={institutional.id} className="bg-[var(--opr-sand)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
            {institutional.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl">
            {institutional.title}
          </h2>
          <p className="mt-4 text-[var(--opr-navy)]/75">{institutional.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {institutional.links.map((link, i) => (
            <Reveal key={link.url} delay={i * 70}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opr-card-lift group relative flex aspect-[16/10] overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={link.image}
                  alt={link.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--opr-navy)] via-[var(--opr-navy)]/40 to-transparent" />
                <span className="absolute right-4 bottom-4 left-4 text-lg font-bold text-white">
                  {link.title}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
