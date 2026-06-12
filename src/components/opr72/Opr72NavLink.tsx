"use client";

import type { MouseEvent, ReactNode } from "react";
import { scrollToSection } from "@/lib/scroll-to-section";

type Opr72NavLinkProps = {
    sectionId: string;
    className?: string;
    children: ReactNode;
    onNavigate?: () => void;
};

export default function Opr72NavLink({
    sectionId,
    className,
    children,
    onNavigate,
}: Opr72NavLinkProps) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        scrollToSection(sectionId);
        onNavigate?.();
    };

    return (
        <a href={`#${sectionId}`} className={className} onClick={handleClick}>
            {children}
        </a>
    );
}
