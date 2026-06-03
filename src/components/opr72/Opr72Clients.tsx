import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { clients } = opr72Content;

export default function Opr72Clients() {
  return (
    <section id={clients.id} className="bg-[var(--opr-navy)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-gold)] uppercase">
            {clients.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-white sm:text-4xl">
            {clients.title}
          </h2>
        </Reveal>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:pb-0 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {clients.list.map((client, i) => (
            <Reveal
              key={client.name}
              delay={i * 50}
              className="opr-card-lift min-w-[280px] shrink-0 snap-start rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:min-w-0"
            >
              <p className="text-lg font-bold text-white">{client.name}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                <svg className="h-4 w-4 shrink-0 text-[var(--opr-gold)]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {client.location}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
