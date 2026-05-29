import Image from "next/image";

const LOGO_SRC = "/logo-proseport.jpeg";

type LogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
};

export default function Logo({
  size = 48,
  showText = false,
  className = "",
}: LogoProps) {
  return (
    <span
      className={`inline-flex min-w-0 max-w-full items-center gap-2 sm:gap-3 ${className}`}
    >
      <Image
        src={LOGO_SRC}
        alt="PROSEPORT — Organización de Protección Reconocida"
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover shadow-sm"
        priority
      />
      {showText && (
        <span className="truncate text-base font-bold tracking-wide sm:text-lg md:text-xl">
          PROSEPORT
        </span>
      )}
    </span>
  );
}
