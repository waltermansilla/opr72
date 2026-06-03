import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import { getRequestSiteContent } from "@/lib/site-request";

export default async function Vision() {
  const { visionContent } = await getRequestSiteContent();
  return (
    <section id={visionContent.id} className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80">
              <StockImage
                src={visionContent.imagen}
                alt={visionContent.imagenAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="text-left">
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
                {visionContent.etiqueta}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {visionContent.titulo}
              </h2>
              <div className="mt-4 h-0.5 w-12 bg-primary" />
              <p className="mt-6 text-lg leading-relaxed text-slate-700 sm:text-xl">
                {visionContent.texto}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
