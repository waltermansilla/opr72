"use client";

import { useState } from "react";
import { navLinks } from "@/data/content";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-primary shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#inicio");
          }}
          className="text-white"
        >
          <Logo size={44} showText className="[&_span]:text-white" />
        </a>

        <button
          type="button"
          className="rounded p-2 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <ul className="hidden items-center gap-1 md:flex lg:gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="rounded px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark lg:text-base"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <ul className="border-t border-white/20 bg-primary px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="block rounded px-3 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
