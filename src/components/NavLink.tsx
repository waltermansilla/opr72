"use client";

import type { MouseEvent, ReactNode } from "react";
import { scrollToSection } from "@/lib/scroll-to-section";

type NavLinkProps = {
  /** Id de sección (sin #). No usa hash en la URL. */
  sectionId: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

/** Scroll suave a sección sin modificar la URL (href="/" como respaldo seguro). */
export default function NavLink({
  sectionId,
  className,
  children,
  onNavigate,
}: NavLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(sectionId);
    onNavigate?.();
  };

  return (
    <a href="/" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
