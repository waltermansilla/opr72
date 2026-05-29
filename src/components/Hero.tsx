import StockImage from "./StockImage";
import Logo from "./Logo";
import { stockImages } from "@/data/images";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center pt-16"
    >
      <StockImage
        src={stockImages.hero}
        alt="Puerto y contenedores"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center text-white sm:px-6">
        <div className="mb-6 flex justify-center">
          <Logo size={140} className="drop-shadow-lg" />
        </div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/90 sm:text-base">
          Organización de Protección Reconocida
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          PROSEPORT
        </h1>
        <p className="mx-auto mb-4 max-w-2xl text-lg text-white/95 sm:text-xl">
          Servicios marítimos y portuarios de excelencia
        </p>
        <p className="mx-auto mb-10 max-w-2xl text-base text-white/85 sm:text-lg">
          OPR habilitada por la Prefectura Naval Argentina — Buenos Aires,
          Argentina
        </p>
        <a
          href="#contacto"
          className="inline-block rounded-lg bg-white px-8 py-3 text-base font-bold text-primary shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl sm:text-lg"
        >
          Contactanos
        </a>
      </div>
    </section>
  );
}
