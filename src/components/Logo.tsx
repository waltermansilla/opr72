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
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={LOGO_SRC}
        alt="PROSEPORT — Organización de Protección Reconocida"
        width={size}
        height={size}
        className="rounded-full object-cover shadow-sm"
        priority
      />
      {showText && (
        <span className="text-lg font-bold tracking-wide sm:text-xl">
          PROSEPORT
        </span>
      )}
    </span>
  );
}
