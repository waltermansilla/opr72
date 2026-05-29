type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <header className={`mb-10 sm:mb-12 ${alignClass}`}>
      <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
        {label}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-4 h-0.5 w-12 bg-primary ${align === "center" ? "mx-auto" : ""}`}
      />
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
