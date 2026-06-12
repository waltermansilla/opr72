"use client";

import { useEffect, useState } from "react";
import { getHeaderOffset } from "@/lib/scroll-to-section";

/** Orden real de secciones en la página (scroll spy). */
const SECTION_ORDER = [
    "inicio",
    "quienes-somos",
    "servicios",
    "opr",
    "alcance",
    "clientes",
    "institucional",
    "contacto",
] as const;

/** Secciones sin ítem de nav → último nav visible relevante. */
const SECTION_TO_NAV: Record<string, string> = {
    inicio: "inicio",
    "quienes-somos": "quienes-somos",
    servicios: "servicios",
    opr: "opr",
    alcance: "opr",
    clientes: "clientes",
    institucional: "institucional",
    contacto: "contacto",
};

function resolveActiveNavId() {
    const offset = getHeaderOffset() + 72;
    const scrollPos = window.scrollY + offset;

    let activeSection: (typeof SECTION_ORDER)[number] = "inicio";

    for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollPos) activeSection = id;
    }

    return SECTION_TO_NAV[activeSection] ?? "inicio";
}

export function useActiveSection() {
    const [activeNavId, setActiveNavId] = useState("inicio");

    useEffect(() => {
        let raf = 0;

        const update = () => {
            raf = 0;
            setActiveNavId((prev) => {
                const next = resolveActiveNavId();
                return prev === next ? prev : next;
            });
        };

        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return activeNavId;
}
