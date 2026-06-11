import { opr72Content } from "@/data/opr72-content";
import Opr72ClientsGrid from "./Opr72ClientsGrid";
import Opr72Gallery from "./Opr72Gallery";
import Opr72PortShowcase from "./Opr72PortShowcase";
import Reveal from "./Reveal";

const { clients } = opr72Content;

export default function Opr72ClientsAndPorts() {
  return (
    <section
      id={clients.id}
      className="scroll-mt-[5.5rem] bg-[var(--opr-foam)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
            {clients.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl">
            {clients.title}
          </h2>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[var(--opr-sky)]" />
        </Reveal>

        <Opr72ClientsGrid />
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-[var(--opr-navy)]/10 px-4 pt-16 sm:px-6 lg:mt-20 lg:pt-20 lg:px-8">
        <Opr72PortShowcase />
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-[var(--opr-navy)]/10 px-4 pt-10 sm:px-6 lg:mt-20 lg:pt-20 lg:px-8">
        <Opr72Gallery embedded />
      </div>
    </section>
  );
}
