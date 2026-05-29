import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import { aboutText } from "@/data/content";
import { stockImages } from "@/data/images";

export default function About() {
  return (
    <section id="quienes-somos" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label="Institucional"
            title="Quiénes Somos"
            description="Profesionales del ámbito marítimo y portuario al servicio de la seguridad y la excelencia operativa."
          />
        </FadeIn>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn delay={100}>
            <div className="grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80">
                <StockImage
                  src={stockImages.about.main}
                  alt="Operaciones portuarias"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative hidden aspect-[21/9] overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80 sm:block">
                <StockImage
                  src={stockImages.about.secondary}
                  alt="Vista del puerto"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              {aboutText.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
              {[
                { value: "OPR", label: "Habilitada por Prefectura Naval" },
                { value: "5", label: "Departamentos especializados" },
                { value: "10+", label: "Clientes de referencia" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="card px-4 py-4 text-center sm:text-left"
                >
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
