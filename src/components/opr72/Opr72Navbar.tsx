"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { opr72Content } from "@/data/opr72-content";
import { useActiveSection } from "@/lib/use-active-section";
import Opr72DeveloperCredit from "./Opr72DeveloperCredit";
import Opr72NavLink from "./Opr72NavLink";

const { nav, brand } = opr72Content;
const desktopNavItems = nav.slice(1, -1);
const MENU_CLOSE_MS = 480;
const LG_QUERY = "(min-width: 1024px)";

type NavIndicator = {
  left: number;
  width: number;
  visible: boolean;
};

export default function Opr72Navbar() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [indicator, setIndicator] = useState<NavIndicator>({
    left: 0,
    width: 0,
    visible: false,
  });
  const solidRef = useRef(false);
  const navListRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const activeNavId = useActiveSection();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMenu();
    if (window.location.pathname === "/") {
      window.location.reload();
      return;
    }
    window.location.href = "/";
  };

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > 48;
      if (next === solidRef.current) return;
      solidRef.current = next;
      setSolid(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
      const frame = requestAnimationFrame(() => setMenuVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setMenuVisible(false);
    const timer = window.setTimeout(() => setMenuMounted(false), MENU_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuMounted) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuMounted, closeMenu]);

  const headerSolid = solid || menuOpen;

  const updateIndicator = useCallback(() => {
    const list = navListRef.current;
    if (!list || !window.matchMedia(LG_QUERY).matches) {
      setIndicator((prev) => (prev.visible ? { left: 0, width: 0, visible: false } : prev));
      return;
    }

    if (activeNavId === "inicio" || activeNavId === "contacto") {
      setIndicator((prev) => (prev.visible ? { left: 0, width: 0, visible: false } : prev));
      return;
    }

    const item = itemRefs.current.get(activeNavId);
    if (!item) return;

    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setIndicator({
      left: itemRect.left - listRect.left,
      width: itemRect.width,
      visible: true,
    });
  }, [activeNavId]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, headerSolid]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const headerClass = headerSolid
    ? menuOpen
      ? "border-b border-white/10 bg-[var(--opr-navy)] shadow-lg shadow-black/20"
      : "border-b border-white/10 bg-[var(--opr-navy)]/95 shadow-lg shadow-black/20 backdrop-blur-md"
    : "border-b border-transparent bg-transparent";

  const navLinkClass = (id: string) => {
    const isActive = activeNavId === id;
    const base =
      "relative z-[1] rounded-lg px-3 py-2 text-sm tracking-wide transition-colors duration-300";

    if (headerSolid) {
      return `${base} ${isActive ? "font-bold text-white" : "font-semibold text-white/70 hover:text-white"}`;
    }

    return `${base} ${
      isActive
        ? "font-bold text-[var(--opr-navy)]"
        : "font-semibold text-[var(--opr-navy)]/65 hover:text-[var(--opr-navy)]"
    }`;
  };

  const contactActive = activeNavId === "contacto";

  const contactClass = headerSolid
    ? contactActive
      ? "hidden rounded-full border border-white bg-white/15 px-4 py-2 text-sm font-bold text-white transition duration-300 sm:inline-flex"
      : "hidden rounded-full border border-white/40 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-white/10 sm:inline-flex"
    : contactActive
      ? "hidden rounded-full border border-[var(--opr-navy)] bg-[var(--opr-navy)]/10 px-4 py-2 text-sm font-bold text-[var(--opr-navy)] transition duration-300 sm:inline-flex"
      : "hidden rounded-full border border-[var(--opr-navy)]/35 px-4 py-2 text-sm font-bold text-[var(--opr-navy)] transition duration-300 hover:border-[var(--opr-navy)] hover:bg-[var(--opr-navy)]/5 sm:inline-flex";

  const toggleClass = headerSolid
    ? "text-white"
    : "text-[var(--opr-navy)]";

  return (
    <header
      id="opr72-navbar"
      data-opr-solid={headerSolid ? "true" : "false"}
      className={`fixed top-0 right-0 left-0 z-[9999] transition-all duration-500 ${headerClass}`}
    >
      <nav
        className="relative z-[10001] mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8"
        aria-label="Principal"
      >
        <a href="/" className="shrink-0" onClick={handleLogoClick}>
          <Image
            src={brand.logo}
            alt={`${brand.name} — ${brand.tagline}`}
            width={160}
            height={36}
            className={`h-8 w-auto transition-all duration-500 sm:h-9 ${
              headerSolid ? "brightness-0 invert" : ""
            }`}
            priority
          />
        </a>

        <ul
          ref={navListRef}
          className="relative hidden items-center gap-1 lg:flex xl:gap-2"
        >
          <span
            className="opr-nav-indicator"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
            }}
            aria-hidden
          />
          {desktopNavItems.map((item) => (
            <li
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el);
                else itemRefs.current.delete(item.id);
              }}
            >
              <Opr72NavLink sectionId={item.id} className={navLinkClass(item.id)}>
                {item.label}
              </Opr72NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Opr72NavLink sectionId="contacto" className={contactClass}>
            Contacto
          </Opr72NavLink>

          <button
            type="button"
            className={`opr-menu-toggle flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${toggleClass}`}
            aria-expanded={menuOpen}
            aria-controls="opr72-mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`opr-menu-line opr-menu-line-top ${menuOpen ? "is-open" : ""}`}
              aria-hidden
            />
            <span
              className={`opr-menu-line opr-menu-line-mid ${menuOpen ? "is-open" : ""}`}
              aria-hidden
            />
            <span
              className={`opr-menu-line opr-menu-line-bot ${menuOpen ? "is-open" : ""}`}
              aria-hidden
            />
          </button>
        </div>
      </nav>

      {menuMounted && (
        <div
          id="opr72-mobile-menu"
          className={`opr-mobile-menu fixed inset-0 z-[10000] lg:hidden ${menuVisible ? "is-open" : ""}`}
          aria-hidden={!menuVisible}
        >
          <button
            type="button"
            className="opr-mobile-menu-backdrop"
            aria-label="Cerrar menú"
            onClick={closeMenu}
          />

          <div className="opr-mobile-menu-panel">
            <nav className="opr-mobile-menu-links" aria-label="Menú móvil">
              {nav.map((item) => (
                <Opr72NavLink
                  key={item.id}
                  sectionId={item.id}
                  onNavigate={closeMenu}
                  className="opr-mobile-menu-link font-[family-name:var(--font-opr-display)]"
                >
                  {item.label}
                </Opr72NavLink>
              ))}
            </nav>
            <Opr72DeveloperCredit variant="menu" />
          </div>
        </div>
      )}
    </header>
  );
}
