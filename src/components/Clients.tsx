import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import { getRequestSiteContent } from "@/lib/site-request";

export default async function Clients() {
  const { clients, clientsContent } = await getRequestSiteContent();
  const { encabezado } = clientsContent;

  return (
    <section id={clientsContent.id} className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label={encabezado.etiqueta}
            title={encabezado.titulo}
            description={encabezado.descripcion}
          />
        </FadeIn>

        <FadeIn delay={50}>
          <div className="relative mb-10 h-36 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80 sm:h-44">
            <StockImage
              src={clientsContent.imagenCabecera}
              alt={clientsContent.imagenCabeceraAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((client, index) => (
            <FadeIn key={client.name} delay={index * 40}>
              <article className="card group flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-32 w-full overflow-hidden">
                  <StockImage
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-2 text-base leading-snug font-bold text-slate-900 group-hover:text-primary">
                    {client.name}
                  </h3>
                  <p className="mt-auto text-sm text-slate-500">
                    {client.location}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
