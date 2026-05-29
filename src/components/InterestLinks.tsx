import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import { interestLinks } from "@/data/content";

export default function InterestLinks() {
  return (
    <section id="enlaces" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label="Recursos"
            title="Enlaces de Interés"
            description="Organismos y normativas de referencia en materia marítima y portuaria."
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {interestLinks.map((link, index) => (
            <FadeIn key={link.title} delay={index * 60}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-36 overflow-hidden">
                  <StockImage
                    src={link.image}
                    alt={link.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>
                <div className="flex flex-1 items-center border-t border-slate-100 px-3 py-3">
                  <span className="text-center text-sm font-semibold text-slate-800 group-hover:text-primary">
                    {link.title}
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
