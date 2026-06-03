import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import { getRequestSiteContent } from "@/lib/site-request";

export default async function About() {
  const { aboutContent } = await getRequestSiteContent();
  const { encabezado, destacados } = aboutContent;

  return (
    <section id={aboutContent.id} className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label={encabezado.etiqueta}
            title={encabezado.titulo}
            description={encabezado.descripcion}
          />
        </FadeIn>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn delay={100}>
            <div className="grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80">
                <StockImage
                  src={aboutContent.imagenPrincipal}
                  alt={aboutContent.imagenPrincipalAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative hidden aspect-[21/9] overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80 sm:block">
                <StockImage
                  src={aboutContent.imagenSecundaria}
                  alt={aboutContent.imagenSecundariaAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              {aboutContent.parrafos.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
              {destacados.map((stat) => (
                <div
                  key={stat.valor}
                  className="card px-4 py-4 text-center sm:text-left"
                >
                  <p className="text-2xl font-bold text-primary">{stat.valor}</p>
                  <p className="mt-1 text-sm text-slate-600">{stat.etiqueta}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
