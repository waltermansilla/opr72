import { opr72Content } from "@/data/opr72-content";
import Reveal from "./Reveal";

const { list } = opr72Content.clients;

export default function Opr72ClientsGrid() {
  return (
    <ul className="opr-clients-grid mx-auto mt-14 grid max-w-6xl list-none grid-cols-2 place-items-center gap-x-4 gap-y-8 p-0 sm:gap-x-8 sm:gap-y-12 lg:max-w-7xl lg:grid-cols-6 lg:gap-x-8 lg:gap-y-14">
      {list.map((client, i) => (
        <Reveal
          key={client.name}
          as="li"
          delay={i * 40}
          className="flex h-24 w-full max-w-[11rem] items-center justify-center px-2 py-3 lg:max-w-[9.5rem] lg:px-0 lg:py-0"
        >
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            title={client.name}
            className="group flex h-full w-full items-center justify-center rounded-xl p-3 transition-transform duration-300 ease-out hover:scale-110 lg:rounded-none lg:p-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={"logoCard" in client && client.logoCard ? client.logoCard : client.logo}
              alt={client.name}
              loading="lazy"
              className={`max-h-12 w-full object-contain object-center sm:max-h-14 ${
                "logoCardClass" in client && client.logoCardClass ? client.logoCardClass : ""
              }`}
            />
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
