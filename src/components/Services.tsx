"use client";

import StockImage from "./StockImage";
import { useState } from "react";
import FadeIn from "./FadeIn";
import { services } from "@/data/content";
import { stockImages } from "@/data/images";

export default function Services() {
  const [openId, setOpenId] = useState<string | null>("capacitacion");

  return (
    <section id="servicios" className="relative bg-white py-20 sm:py-24">
      <div className="absolute inset-0 opacity-20">
        <StockImage
          src={stockImages.servicesBg}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb-4 text-center text-3xl font-bold text-primary sm:text-4xl">
            Servicios
          </h2>
          <div className="mx-auto mb-12 h-1 w-20 bg-primary" />
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
            Cinco departamentos especializados para cubrir todas las necesidades
            de protección marítima y portuaria.
          </p>
        </FadeIn>

        <div className="space-y-3">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={index * 50}>
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setOpenId(openId === service.id ? null : service.id)
                  }
                  className="flex w-full items-center gap-4 bg-primary px-4 py-3 text-left font-semibold text-white transition-colors hover:bg-primary-dark sm:px-5 sm:py-4"
                  aria-expanded={openId === service.id}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border-2 border-white/30 sm:h-14 sm:w-14">
                    <StockImage
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <span className="flex-1">{service.title}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 transition-transform ${
                      openId === service.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openId === service.id && (
                  <div className="bg-white p-5 sm:p-6">
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg md:h-auto md:w-2/5 md:min-h-[220px]">
                        <StockImage
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                      <div className="flex-1 text-gray-700">
                        <p className="mb-4 font-medium text-gray-900">
                          {service.intro}
                        </p>

                        {service.sections ? (
                          <div className="space-y-4">
                            {service.sections.map((section) => (
                              <div key={section.title}>
                                <h4 className="mb-2 font-bold text-primary">
                                  {section.title}
                                </h4>
                                <ul className="list-inside list-disc space-y-1 text-sm sm:text-base">
                                  {section.items.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            {service.listLabel && (
                              <p className="mb-2 font-semibold text-gray-800">
                                {service.listLabel}
                              </p>
                            )}
                            <ul className="list-inside list-disc space-y-1 text-sm sm:text-base">
                              {service.items?.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                            {service.footer && (
                              <p className="mt-4 text-sm font-semibold text-primary">
                                {service.footer}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
