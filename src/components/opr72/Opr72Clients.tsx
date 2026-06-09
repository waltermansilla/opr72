import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { clients } = opr72Content;

export default function Opr72Clients() {
  return (
    <section id={clients.id} className="bg-[var(--opr-foam)] py-20 sm:py-28">
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

        <ul className="mx-auto mt-14 grid max-w-5xl list-none grid-cols-2 place-items-center gap-x-4 gap-y-8 p-0 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-14 lg:max-w-6xl lg:grid-cols-5 lg:gap-x-12 lg:gap-y-16">
          {clients.list.map((client, i) => (
            <Reveal
              key={client.name}
              as="li"
              delay={i * 40}
              className="flex h-24 w-full max-w-[11rem] items-center justify-center px-2 py-3 lg:max-w-[10.5rem] lg:px-0 lg:py-0"
            >
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={client.name}
                className="group flex h-full w-full items-center justify-center rounded-xl p-3 transition-transform duration-300 ease-out hover:scale-110 lg:rounded-none lg:p-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 w-full object-contain object-center sm:max-h-14"
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
