import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import { interestLinks } from "@/data/content";

export default function InterestLinks() {
  return (
    <section id="enlaces" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb-4 text-center text-3xl font-bold text-primary sm:text-4xl">
            Enlaces de Interés
          </h2>
          <div className="mx-auto mb-12 h-1 w-20 bg-primary" />
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {interestLinks.map((link, index) => (
            <FadeIn key={link.title} delay={index * 60}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <StockImage
                    src={link.image}
                    alt={link.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>
                <div className="bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-colors group-hover:bg-primary-dark">
                  {link.title}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
