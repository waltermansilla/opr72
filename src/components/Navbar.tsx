"use client";

import { useRef } from "react";
import { menuLinks } from "@/data/content";
import Logo from "./Logo";
import NavLink from "./NavLink";

const contactBtnClass =
  "inline-flex touch-manipulation cursor-pointer items-center justify-center rounded-full border border-primary bg-transparent px-3 py-1 text-xs font-semibold tracking-wide text-primary transition-colors hover:border-primary-dark hover:bg-primary/5 hover:text-primary-dark active:bg-primary/10";

const navItemClass =
  "touch-manipulation cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 hover:text-primary-dark active:bg-primary/10";

export default function Navbar() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  const closeMobileMenu = () => {
    mobileMenuRef.current?.removeAttribute("open");
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-[9999] max-lg:bg-white lg:bg-white/95 lg:backdrop-blur-md">
      <nav
        className="relative border-b border-slate-200/60"
        aria-label="Principal"
      >
        {/* ——— Mobile ——— */}
        <div className="relative mx-auto grid h-12 max-w-7xl grid-cols-3 items-center px-3 sm:px-5 lg:hidden">
          {/* Menú nativo con <details> — funciona sin depender de onClick */}
          <details ref={mobileMenuRef} className="group relative">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full text-primary [-webkit-tap-highlight-color:transparent] marker:content-none active:bg-primary/10 [&::-webkit-details-marker]:hidden"
              aria-label="Abrir menú"
            >
              <svg
                className="h-5 w-7 group-open:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 28 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeWidth={1.75} d="M2 6h24" />
                <path strokeLinecap="round" strokeWidth={1.75} d="M2 12h24" />
                <path strokeLinecap="round" strokeWidth={1.75} d="M2 18h24" />
              </svg>
              <svg
                className="hidden h-5 w-7 group-open:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 28 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M7 19L21 5M7 5l14 14"
                />
              </svg>
            </summary>

            <div className="fixed top-12 right-0 left-0 z-[9998] max-h-[calc(100dvh-3rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-lg">
              <ul className="mx-auto max-w-7xl px-3 py-2 sm:px-5">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      sectionId={link.href.replace(/^#/, "")}
                      onNavigate={closeMobileMenu}
                      className="block w-full touch-manipulation rounded-md px-3 py-3.5 text-left text-sm font-semibold text-primary active:bg-primary/10"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <a
            href="/"
            className="inline-flex touch-manipulation items-center justify-center active:opacity-80"
            aria-label="Recargar inicio"
          >
            <Logo size={44} />
          </a>

          <div className="flex items-center justify-end">
            <NavLink sectionId="contacto" className={contactBtnClass}>
              Contacto
            </NavLink>
          </div>
        </div>

        {/* ——— Desktop ——— */}
        <div className="mx-auto hidden h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:grid xl:px-8">
          <a
            href="/"
            className="inline-flex touch-manipulation items-center justify-self-start active:opacity-80"
            aria-label="Recargar inicio"
          >
            <Logo size={44} />
          </a>

          <ul className="flex flex-wrap items-center justify-center gap-2 xl:gap-4">
            {menuLinks.map((link) => (
              <li key={link.href} className="flex items-center">
                <NavLink
                  sectionId={link.href.replace(/^#/, "")}
                  className={navItemClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-self-end">
            <NavLink sectionId="contacto" className={contactBtnClass}>
              Contacto
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
