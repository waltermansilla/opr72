import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import { visionText } from "@/data/content";
import { stockImages } from "@/data/images";

export default function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden py-20 sm:py-28">
      <StockImage
        src={stockImages.vision}
        alt="Horizonte marítimo"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <FadeIn>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Nuestra Visión
          </h2>
          <div className="mx-auto mb-10 h-1 w-20 bg-white/60" />
          <p className="text-lg leading-relaxed text-white/95 sm:text-xl">
            {visionText}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
