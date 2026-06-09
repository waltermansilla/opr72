import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Opr72DeveloperCredit from "./Opr72DeveloperCredit";

const { brand, contact, nav } = opr72Content;

export default function Opr72Footer() {
    const year = new Date().getFullYear();
    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.mailtoSubject)}`;

    return (
        <footer className="relative overflow-hidden bg-[var(--opr-navy)] text-white/75">
            <div className="opr-gradient-patriotic absolute top-0 right-0 left-0 h-1 opacity-80" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-4">
                        <p className="text-xs font-bold tracking-[0.2em] text-[var(--opr-gold)] uppercase">
                            Secciones
                        </p>
                        <nav aria-label="Pie de página" className="mt-4">
                            <ul className="space-y-2">
                                {nav.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            className="text-xs font-medium text-white/70 transition hover:text-white sm:text-sm"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <p className="text-xs font-bold tracking-[0.2em] text-[var(--opr-gold)] uppercase">
                            Contacto
                        </p>
                        <div className="mt-4 space-y-3 text-xs sm:space-y-4 sm:text-sm">
                            <div>
                                <p className="font-semibold text-white/90">
                                    {contact.address}
                                </p>
                                <p className="text-white/65">{contact.city}</p>
                            </div>
                            <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                                <a
                                    href={contact.phoneHref}
                                    className="font-medium text-[var(--opr-sky-light)] transition hover:text-white"
                                >
                                    {contact.phoneDisplay}
                                </a>
                                <a
                                    href={mailto}
                                    className="break-all font-medium text-[var(--opr-sky-light)] transition hover:text-white sm:break-normal"
                                >
                                    {contact.email}
                                </a>
                            </div>
                            <a
                                href={contact.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/5 sm:px-4 sm:py-2 sm:text-sm"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-8 text-center">
                    <Image
                        src={brand.logoStacked}
                        alt={brand.name}
                        width={200}
                        height={80}
                        className="h-auto w-40 brightness-0 invert sm:w-44"
                    />
                    <p className="text-xs text-white/40">
                        © {year} {brand.name}. Organización de Protección Reconocida
                        Nº 72 — Buenos Aires, Argentina.
                    </p>
                    <Opr72DeveloperCredit variant="footer" />
                </div>
            </div>
        </footer>
    );
}
