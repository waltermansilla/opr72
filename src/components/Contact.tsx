import type { ReactNode } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import { contact } from "@/data/content";

const btnIcon =
  "inline-flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-lg transition-colors";

const btnText =
  "inline-flex touch-manipulation items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors";

function EnterArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 10l-5 5 5 5M4 15h12a4 4 0 004-4V6"
      />
    </svg>
  );
}

function ContactCard({
  icon,
  title,
  children,
  actions,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  actions: ReactNode;
}) {
  return (
    <div className="card flex h-full flex-col p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="text-sm font-bold tracking-wide text-primary uppercase">
          {title}
        </h3>
      </div>
      <div className="mb-5 flex-1 text-slate-700">{children}</div>
      <div className="flex flex-wrap items-center justify-end gap-2">{actions}</div>
    </div>
  );
}

export default function Contact() {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.mailtoSubject)}`;
  const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <section id="contacto" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label="Estamos cerca"
            title="Contacto"
            description="Escribinos, llamanos o visitanos en nuestra oficina en CABA."
          />
        </FadeIn>

        <FadeIn delay={80}>
          <div className="card mb-8 overflow-hidden">
            <div className="relative h-64 w-full sm:h-80">
              <iframe
                src={contact.mapEmbed}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de PROSEPORT en Google Maps"
              />
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-3">
          <FadeIn delay={120}>
            <ContactCard
              title="Dirección"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              actions={
                <a
                  href={contact.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnText} bg-primary text-white hover:bg-primary-dark`}
                >
                  Cómo llegar
                  <EnterArrowIcon />
                </a>
              }
            >
              <p className="font-medium text-slate-900">{contact.address}</p>
              <p className="mt-1 text-slate-600">{contact.city}</p>
            </ContactCard>
          </FadeIn>

          <FadeIn delay={160}>
            <ContactCard
              title="Teléfono"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
              actions={
                <>
                  <a
                    href={contact.phoneHref}
                    aria-label="Llamar"
                    className={`${btnIcon} bg-primary text-white hover:bg-primary-dark`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className={`${btnIcon} bg-[#25D366] text-white hover:bg-[#20bd5a]`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.882 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </>
              }
            >
              <p className="text-lg font-semibold text-slate-900">
                {contact.phoneDisplay}
              </p>
              <p className="mt-1 text-sm text-slate-500">{contact.phone}</p>
            </ContactCard>
          </FadeIn>

          <FadeIn delay={200}>
            <ContactCard
              title="Email"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              actions={
                <a
                  href={mailto}
                  aria-label="Escribir email"
                  className={`${btnIcon} bg-primary text-white hover:bg-primary-dark`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              }
            >
              <p className="break-all font-medium text-slate-900">
                {contact.email}
              </p>
            </ContactCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
