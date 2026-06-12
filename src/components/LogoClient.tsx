"use client";

import Image from "next/image";
import type { SiteData } from "@/data/site";

type LogoClientProps = {
  logoContent: SiteData["logo"];
  siteName: string;
  size?: number;
  showText?: boolean;
  className?: string;
};

export default function LogoClient({
  logoContent,
  siteName,
  size = 48,
  showText,
  className = "",
}: LogoClientProps) {
  const showLabel = showText ?? !logoContent.ruta;

  return (
    <span
      className={`inline-flex min-w-0 max-w-full items-center gap-2 sm:gap-3 ${className}`}
    >
      {logoContent.ruta ? (
        <Image
          src={logoContent.ruta}
          alt={logoContent.textoAlternativo}
          width={size}
          height={size}
          className="shrink-0 rounded-full object-cover shadow-sm"
          priority
        />
      ) : (
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white shadow-sm"
          style={{ width: size, height: size, fontSize: size * 0.28 }}
          aria-hidden
        >
          {siteName.slice(0, 3)}
        </span>
      )}
      {showLabel && (
        <span className="truncate text-base font-bold tracking-wide text-primary sm:text-lg md:text-xl">
          {siteName}
        </span>
      )}
    </span>
  );
}
