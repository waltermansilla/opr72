import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import Logo from "./Logo";
import { aboutText } from "@/data/content";
import { stockImages } from "@/data/images";

export default function About() {
  return (
    <section id="quienes-somos" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8 flex flex-col items-center">
            <Logo size={120} />
          </div>
          <h2 className="mb-4 text-center text-3xl font-bold text-primary sm:text-4xl">
            Quiénes Somos
          </h2>
          <div className="mx-auto mb-12 h-1 w-20 bg-primary" />
        </FadeIn>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn delay={100}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <StockImage
                  src={stockImages.about.main}
                  alt="Operaciones portuarias"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative hidden aspect-[16/9] overflow-hidden rounded-xl shadow-lg sm:block lg:aspect-[21/9]">
                <StockImage
                  src={stockImages.about.secondary}
                  alt="Vista aérea del puerto"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="space-y-4 leading-relaxed text-gray-700">
              {aboutText.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-lg border border-primary/20 bg-white px-5 py-4 shadow-sm">
                <p className="text-2xl font-bold text-primary">OPR</p>
                <p className="text-sm text-gray-600">
                  Habilitada por Prefectura Naval
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-white px-5 py-4 shadow-sm">
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-sm text-gray-600">
                  Departamentos especializados
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-white px-5 py-4 shadow-sm">
                <p className="text-2xl font-bold text-primary">10+</p>
                <p className="text-sm text-gray-600">Clientes de referencia</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
