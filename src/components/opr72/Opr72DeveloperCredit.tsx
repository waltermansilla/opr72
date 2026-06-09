import { opr72Content } from "@/data/opr72-content";

const { developer } = opr72Content;

type Opr72DeveloperCreditProps = {
  variant: "menu" | "footer";
};

export default function Opr72DeveloperCredit({ variant }: Opr72DeveloperCreditProps) {
  const isMenu = variant === "menu";

  return (
    <p
      className={
        isMenu
          ? "opr-dev-credit-menu text-center text-xs text-white/40"
          : "text-center text-xs text-white/40"
      }
    >
      {developer.label}{" "}
      <a
        href={developer.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/55 transition hover:text-white/80"
      >
        {developer.name}
      </a>
    </p>
  );
}
