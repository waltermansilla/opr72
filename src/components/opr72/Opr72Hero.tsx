"use client";

import Image from "next/image";
import { opr72Content } from "@/data/opr72-content";
import Opr72NavLink from "./Opr72NavLink";

const { hero } = opr72Content;

export default function Opr72Hero() {
    return (
        <section
            id="inicio"
            className="relative flex min-h-[100dvh] items-end overflow-hidden lg:items-center"
        >
            <div className="opr-hero-bg absolute inset-0 scale-105">
                <Image
                    src={hero.image}
                    alt={hero.imageAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--opr-navy)]/85 via-[var(--opr-navy)]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--opr-navy)]/45 via-[var(--opr-navy)]/10 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 lg:px-8 lg:pt-32">
                <div className="max-w-3xl">
                    <h1 className="opr-hero-line font-[family-name:var(--font-opr-display)] text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                        {hero.title}
                    </h1>
                    <p className="opr-hero-line mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
                        {hero.subtitle}
                    </p>
                    <div className="opr-hero-line mt-10 flex flex-wrap gap-4">
                        <Opr72NavLink
                            sectionId="contacto"
                            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[var(--opr-navy)] shadow-lg transition hover:bg-slate-100 active:scale-[0.98]"
                        >
                            {hero.ctaPrimary}
                        </Opr72NavLink>
                        <Opr72NavLink
                            sectionId="servicios"
                            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/15"
                        >
                            {hero.ctaSecondary}
                        </Opr72NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
