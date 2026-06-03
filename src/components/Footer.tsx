import { getRequestSiteContent } from "@/lib/site-request";
import Logo from "./Logo";

export default async function Footer() {
  const { site, contact, footerContent } = await getRequestSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <div className="mb-4 flex justify-center md:justify-start">
              <Logo size={52} className="[&_img]:ring-2 [&_img]:ring-white/20" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {footerContent.descripcion}
            </p>
          </div>
          <div className="text-sm leading-relaxed">
            <p className="font-medium text-white">{contact.address}</p>
            <p>{contact.city}</p>
            <p className="mt-3">
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phone}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-white"
              >
                {contact.email}
              </a>
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {year} {site.sitio.nombre}. {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
}
