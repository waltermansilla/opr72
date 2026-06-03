import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";

const { brand, contact, nav } = opr72Content;

export default function Opr72Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[var(--opr-navy)] py-14 text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src={brand.logoStacked}
              alt={brand.name}
              width={200}
              height={80}
              className="h-auto w-40 brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{brand.tagline}</p>
            <p className="mt-2 text-sm">
              {contact.address} — {contact.city}
            </p>
          </div>
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/45">
          © {year} {brand.name}. Organización de Protección Reconocida — Buenos Aires,
          Argentina.
        </p>
      </div>
    </footer>
  );
}
