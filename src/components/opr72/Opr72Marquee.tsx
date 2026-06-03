import { opr72Content } from "@/data/opr72-content";

export default function Opr72Marquee() {
  const items = [...opr72Content.marquee, ...opr72Content.marquee];

  return (
    <div className="overflow-hidden border-y border-[var(--opr-navy)]/10 bg-white py-4">
      <div className="opr-marquee-track flex w-max gap-12 whitespace-nowrap">
        {items.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="flex items-center gap-12 text-sm font-bold tracking-[0.2em] text-[var(--opr-navy)] uppercase"
          >
            {text}
            <span className="text-[var(--opr-sky)]" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
