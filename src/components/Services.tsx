import StockImage from "./StockImage";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import { getRequestSiteContent } from "@/lib/site-request";

export default async function Services() {
  const { services, servicesContent } = await getRequestSiteContent();
  const { encabezado } = servicesContent;

  return (
    <section id={servicesContent.id} className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label={encabezado.etiqueta}
            title={encabezado.titulo}
            description={encabezado.descripcion}
          />
        </FadeIn>

        <div className="space-y-3">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={index * 50}>
              <details
                className="group card overflow-hidden transition-shadow open:shadow-md hover:shadow-md"
                open={index === 0}
              >
                <summary className="flex w-full min-w-0 cursor-pointer list-none items-center gap-3 px-4 py-4 text-left transition-colors [-webkit-tap-highlight-color:transparent] marker:content-none active:bg-slate-50 sm:gap-4 sm:px-5 [&::-webkit-details-marker]:hidden">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-200">
                    <StockImage
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-slate-900 sm:text-base">
                    {service.title}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-primary transition-transform group-open:rotate-180">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-slate-100 px-4 py-5 sm:px-5 sm:py-6">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl ring-1 ring-slate-200 md:h-auto md:w-2/5 md:min-h-[220px]">
                      <StockImage
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                    <div className="flex-1 text-slate-700">
                      <p className="mb-4 font-medium text-slate-900">
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
                            <p className="mb-2 font-semibold text-slate-800">
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
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
