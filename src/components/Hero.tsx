import ScrollLink from "./ScrollLink";
import StockImage from "./StockImage";
import { getRequestSiteContent } from "@/lib/site-request";

export default async function Hero() {
  const { heroContent } = await getRequestSiteContent();
  return (
    <section
      id="inicio"
      className="relative z-0 flex min-h-[100dvh] items-end pt-12 sm:items-center lg:pt-14"
    >
      <StockImage
        src={heroContent.imagen}
        alt={heroContent.imagenAlt}
        fill
        priority
        className="pointer-events-none object-cover"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-900/10 sm:bg-gradient-to-r sm:from-slate-950/88 sm:via-slate-900/45 sm:to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl text-left">
          <p className="mb-3 inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/95 backdrop-blur-sm sm:text-sm">
            {heroContent.etiqueta}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heroContent.titulo}
          </h1>
          <p className="mb-3 text-lg font-medium text-white/95 sm:text-xl">
            {heroContent.subtitulo}
          </p>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {heroContent.descripcion}
          </p>
          <div className="flex flex-wrap gap-3">
            <ScrollLink
              sectionId="contacto"
              className="inline-flex touch-manipulation cursor-pointer items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition hover:bg-slate-50 active:bg-slate-100 sm:px-8 sm:text-base"
            >
              {heroContent.botones.contacto}
            </ScrollLink>
            <ScrollLink
              sectionId="servicios"
              className="inline-flex touch-manipulation cursor-pointer items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:bg-white/25 sm:px-8 sm:text-base"
            >
              {heroContent.botones.servicios}
            </ScrollLink>
          </div>
        </div>
      </div>
    </section>
  );
}
