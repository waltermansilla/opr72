import { opr72Content } from "@/data/opr72-content";

const { list } = opr72Content.clients;

function MarqueeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
      aria-hidden={ariaHidden || undefined}
    >
      {list.map((client) => {
        const extraClass =
          "logoMarqueeClass" in client && client.logoMarqueeClass
            ? client.logoMarqueeClass
            : "";
        const sizeClass =
          "logoMarqueeSizeClass" in client && client.logoMarqueeSizeClass
            ? client.logoMarqueeSizeClass
            : "w-28 sm:w-36";

        return (
          <a
            key={client.name}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            title={client.name}
            tabIndex={ariaHidden ? -1 : undefined}
            className={`group flex h-12 shrink-0 items-center justify-center transition-transform duration-300 ease-out hover:scale-110 sm:h-14 ${sizeClass}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              className={`h-full w-full object-contain object-center opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${extraClass}`}
            />
          </a>
        );
      })}
    </div>
  );
}

export default function Opr72ClientsMarquee() {
  return (
    <div className="opr-clients-marquee relative overflow-hidden">
      <div className="opr-marquee-track flex w-max items-center">
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  );
}
