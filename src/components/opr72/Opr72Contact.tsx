import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { contact } = opr72Content;

export default function Opr72Contact() {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.mailtoSubject)}`;

  return (
    <section id={contact.id} className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-bold tracking-[0.2em] text-[var(--opr-sky)] uppercase">
              {contact.label}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-opr-display)] text-3xl font-bold text-[var(--opr-navy)] sm:text-4xl">
              {contact.title}
            </h2>
            <p className="mt-4 text-[var(--opr-navy)]/75">{contact.description}</p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs font-bold tracking-widest text-[var(--opr-navy)]/50 uppercase">
                  Dirección
                </p>
                <p className="mt-1 font-semibold text-[var(--opr-navy)]">{contact.address}</p>
                <p className="text-[var(--opr-navy)]/70">{contact.city}</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-[var(--opr-navy)]/50 uppercase">
                  Teléfono
                </p>
                <a
                  href={contact.phoneHref}
                  className="mt-1 block font-semibold text-[var(--opr-sky)] hover:underline"
                >
                  {contact.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-[var(--opr-navy)]/50 uppercase">
                  Email
                </p>
                <a
                  href={mailto}
                  className="mt-1 block font-semibold text-[var(--opr-sky)] hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="inline-flex items-center rounded-full bg-[var(--opr-navy)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--opr-navy-soft)]"
              >
                Escribir email
              </a>
              <a
                href={contact.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[var(--opr-navy)]/20 px-6 py-3 text-sm font-semibold text-[var(--opr-navy)] transition hover:bg-[var(--opr-foam)]"
              >
                Cómo llegar
              </a>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-xl lg:block">
              <Image
                src="/images/stock/contact-office.jpg"
                alt="Oficina OPR72"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl shadow-lg lg:mt-0">
              <iframe
                title="Ubicación OPR72"
                src={contact.mapEmbed}
                className="h-64 w-full border-0 sm:h-80 lg:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
