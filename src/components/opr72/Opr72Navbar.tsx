"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { opr72Content } from "@/data/opr72-content";
import Opr72NavLink from "./Opr72NavLink";

const { nav, brand } = opr72Content;

export default function Opr72Navbar() {
  const [solid, setSolid] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => menuRef.current?.removeAttribute("open");

  const headerClass = solid
    ? "border-b border-white/10 bg-[var(--opr-navy)]/95 shadow-lg shadow-black/20 backdrop-blur-md"
    : "border-b border-transparent bg-transparent";

  const linkClass = solid
    ? "text-white/90 hover:text-white"
    : "text-[var(--opr-navy)] hover:text-[var(--opr-navy-soft)]";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-[9999] transition-all duration-500 ${headerClass}`}
    >
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8"
        aria-label="Principal"
      >
        <Opr72NavLink sectionId="inicio" className="shrink-0">
          <Image
            src={brand.logo}
            alt={`${brand.name} — ${brand.tagline}`}
            width={160}
            height={36}
            className={`h-8 w-auto transition-all duration-500 sm:h-9 ${
              solid ? "brightness-0 invert" : ""
            }`}
            priority
          />
        </Opr72NavLink>

        <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
          {nav.slice(1, -1).map((item) => (
            <li key={item.id}>
              <Opr72NavLink
                sectionId={item.id}
                className={`rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${linkClass}`}
              >
                {item.label}
              </Opr72NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Opr72NavLink
            sectionId="contacto"
            className={`hidden rounded-full border px-4 py-2 text-sm font-bold transition sm:inline-flex ${
              solid
                ? "border-white/40 text-white hover:bg-white/10"
                : "border-[var(--opr-navy)]/35 text-[var(--opr-navy)] hover:border-[var(--opr-navy)] hover:bg-[var(--opr-navy)]/5"
            }`}
          >
            Contacto
          </Opr72NavLink>

          <details ref={menuRef} className="relative lg:hidden">
            <summary
              className={`flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full [&::-webkit-details-marker]:hidden ${linkClass}`}
              aria-label="Menú"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div className="absolute top-full right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[var(--opr-navy)] py-2 shadow-2xl">
              {nav.map((item) => (
                <Opr72NavLink
                  key={item.id}
                  sectionId={item.id}
                  onNavigate={closeMenu}
                  className="block px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Opr72NavLink>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
