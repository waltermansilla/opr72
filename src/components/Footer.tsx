import { contact } from "@/data/content";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark py-10 text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="mb-3 flex justify-center md:justify-start">
              <Logo size={56} />
            </div>
            <p className="text-sm">
              Organización de Protección Reconocida — Buenos Aires, Argentina
            </p>
          </div>
          <div className="text-sm">
            <p>{contact.address}</p>
            <p>{contact.city}</p>
            <p className="mt-2">
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phone}
              </a>
              {" · "}
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-white"
              >
                {contact.email}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {contact.websiteLabel}
              </a>
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-white/60">
          © {year} PROSEPORT. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
