import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import { clients } from "@/data/content";
import { stockImages } from "@/data/images";

export default function Clients() {
  return (
    <section id="clientes" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative mb-12 h-40 overflow-hidden rounded-xl sm:h-52">
            <StockImage
              src={stockImages.clients.header}
              alt="Terminales y operaciones portuarias"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/70">
              <h2 className="px-4 text-center text-3xl font-bold text-white sm:text-4xl">
                Nuestros Principales Clientes
              </h2>
            </div>
          </div>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Confían en PROSEPORT terminales, consorcios portuarios y empresas
            líderes del sector energético y logístico.
          </p>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((client, index) => (
            <FadeIn key={client.name} delay={index * 40}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                <div className="relative h-32 w-full overflow-hidden">
                  <StockImage
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-2 font-bold text-gray-900 group-hover:text-primary">
                    {client.name}
                  </h3>
                  <p className="mt-auto text-sm text-gray-500">
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
