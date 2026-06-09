import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";

const { brand, mobileGalleries } = opr72Content;

export default function Opr72MobileClosing() {
  const { closing } = mobileGalleries;

  return (
    <div className="lg:hidden">
      <div className="relative aspect-[4/3] w-full bg-[var(--opr-navy)]">
        <Image
          src={closing.image.src}
          alt={closing.image.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="bg-white px-6 py-12 text-center sm:px-8 sm:py-14">
        <Image
          src={brand.logoStacked}
          alt={`${brand.name} — ${brand.tagline}`}
          width={240}
          height={120}
          className="mx-auto h-auto w-48 sm:w-52"
        />
      </div>
    </div>
  );
}
