import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import { contact } from "@/data/content";
import { stockImages } from "@/data/images";

export default function Contact() {
  const fullAddress = `${contact.address} — ${contact.city}`;

  return (
    <section id="contacto" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb-4 text-center text-3xl font-bold text-primary sm:text-4xl">
            Contacto
          </h2>
          <div className="mx-auto mb-12 h-1 w-20 bg-primary" />
        </FadeIn>

        <FadeIn delay={50}>
          <div className="relative mb-10 h-48 overflow-hidden rounded-xl shadow-lg sm:h-56">
            <StockImage
              src={stockImages.contact.banner}
              alt="Oficinas PROSEPORT"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/90 to-transparent p-6 sm:p-8">
              <p className="text-lg font-semibold text-white sm:text-xl">
                {fullAddress}
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mb-10 grid gap-6 lg:grid-cols-5">
          <FadeIn delay={100} className="lg:col-span-3">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-72 w-full sm:h-96">
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

          <FadeIn delay={150} className="lg:col-span-2">
            <div className="relative h-72 overflow-hidden rounded-xl shadow-lg sm:h-96">
              <StockImage
                src={stockImages.contact.office}
                alt="Oficina"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </FadeIn>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FadeIn delay={200}>
            <div className="h-full rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-primary">Dirección</h3>
              <p className="text-gray-700">{contact.address}</p>
              <p className="mt-1 text-gray-600">{contact.city}</p>
            </div>
          </FadeIn>

          <FadeIn delay={250}>
            <div className="h-full rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-primary">Teléfono</h3>
              <a
                href={contact.phoneHref}
                className="block font-medium text-primary hover:underline"
              >
                {contact.phone}
              </a>
              <p className="mt-1 text-sm text-gray-500">{contact.phoneDisplay}</p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="h-full rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-primary">Email</h3>
              <a
                href={`mailto:${contact.email}`}
                className="break-all font-medium text-primary hover:underline"
              >
                {contact.email}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={350}>
            <div className="h-full rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-primary">Web</h3>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {contact.websiteLabel}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
