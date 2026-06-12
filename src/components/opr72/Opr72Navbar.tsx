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
import { createPortal } from "react-dom";
import { opr72Content } from "@/data/opr72-content";
import { useActiveSection } from "@/lib/use-active-section";
import Opr72DeveloperCredit from "./Opr72DeveloperCredit";
import Opr72NavLink from "./Opr72NavLink";

const { nav, brand } = opr72Content;
const desktopNavItems = nav.slice(1, -1);
const MENU_CLOSE_MS = 280;
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
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState<NavIndicator>({
    left: 0,
    width: 0,
    visible: false,
  });
  const solidRef = useRef(false);
  const menuMountedRef = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);
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
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    menuMountedRef.current = menuOpen || menuMounted;
  }, [menuOpen, menuMounted]);

  useEffect(() => {
    const update = () => {
      if (menuMountedRef.current) return;

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
      setMenuVisible(false);
      return;
    }

    setMenuVisible(false);
    const timer = window.setTimeout(() => setMenuMounted(false), MENU_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!menuOpen || !menuMounted || !portalTarget) return;

    setMenuVisible(false);
    let innerFrame = 0;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => setMenuVisible(true));
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, [menuOpen, menuMounted, portalTarget]);

  useEffect(() => {
    if (!menuOpen) return;

    const html = document.documentElement;
    const { body } = document;

    html.classList.add("opr-menu-scroll-lock");
    body.classList.add("opr-menu-scroll-lock");

    const preventTouchMove = (e: TouchEvent) => {
      const menuEl = menuRef.current;
      if (menuEl && e.target instanceof Node && menuEl.contains(e.target)) return;
      e.preventDefault();
    };

    window.addEventListener("touchmove", preventTouchMove, { passive: false });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      html.classList.remove("opr-menu-scroll-lock");
      body.classList.remove("opr-menu-scroll-lock");
      window.removeEventListener("touchmove", preventTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const headerElevated = solid;

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
  }, [updateIndicator, headerElevated]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const headerClass = [
    headerElevated ? "opr-navbar-glass" : "border-b border-transparent bg-transparent",
    menuOpen ? "opr-header-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const navLinkClass = (id: string) => {
    const isActive = activeNavId === id;
    const base =
      "relative z-[1] rounded-lg px-3 py-2 text-sm tracking-wide transition-colors duration-300";

    return `${base} ${
      isActive
        ? "font-bold text-[var(--opr-navy)]"
        : "font-semibold text-[var(--opr-navy)]/65 hover:text-[var(--opr-navy)]"
    }`;
  };

  const contactActive = activeNavId === "contacto";

  const contactClass = contactActive
    ? "hidden rounded-full border border-[var(--opr-navy)] bg-[var(--opr-navy)]/10 px-4 py-2 text-sm font-bold text-[var(--opr-navy)] transition duration-300 sm:inline-flex"
    : "hidden rounded-full border border-[var(--opr-navy)]/35 px-4 py-2 text-sm font-bold text-[var(--opr-navy)] transition duration-300 hover:border-[var(--opr-navy)] hover:bg-[var(--opr-navy)]/5 sm:inline-flex";

  const toggleClass = "text-[var(--opr-navy)]";

  return (
    <header
      id="opr72-navbar"
      data-opr-solid={headerElevated ? "true" : "false"}
      className={`opr-navbar fixed top-0 right-0 left-0 ${menuOpen ? "z-[10002]" : "z-[9999]"} ${headerClass}`}
    >
      <nav
        className="relative z-[10001] mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8"
        aria-label="Principal"
      >
        <a
          href="/"
          className="opr-navbar-logo flex shrink-0 items-center self-center"
          onClick={handleLogoClick}
        >
          <Image
            src={brand.logo}
            alt={`${brand.name} — ${brand.tagline}`}
            width={160}
            height={36}
            className="block h-8 w-auto transition-all duration-500 sm:h-9"
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

      {menuMounted &&
        portalTarget &&
        createPortal(
          <div
            ref={menuRef}
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
          </div>,
          portalTarget,
        )}
    </header>
  );
}
