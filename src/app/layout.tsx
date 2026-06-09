import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import { SCROLL_RESET_SCRIPT } from "@/lib/scroll-to-section";
import { getRequestSiteContent } from "@/lib/site-request";
import "./globals.css";
import "@/styles/opr72.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

const inter = Inter({
    variable: "--font-source-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const plusJakarta = Plus_Jakarta_Sans({
    variable: "--font-opr-display",
    subsets: ["latin"],
    weight: ["600", "700"],
});

function getSiteUrl() {
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return "https://opr72.vercel.app";
}

export async function generateMetadata(): Promise<Metadata> {
    const { site, logoContent } = await getRequestSiteContent();
    const ogImage = site.openGraph?.imagen ?? "/og-image.jpg";
    const ogWidth = site.openGraph?.imagenAncho ?? 1200;
    const ogHeight = site.openGraph?.imagenAlto ?? 630;

    return {
        metadataBase: new URL(getSiteUrl()),
        title: site.sitio.tituloPagina,
        description: site.sitio.descripcion,
        keywords: site.sitio.palabrasClave,
        icons: {
            icon: "/favicon.png",
            apple: "/apple-icon-180.png",
        },
        openGraph: {
            title: site.sitio.tituloPagina,
            description: site.sitio.descripcion,
            url: getSiteUrl(),
            siteName: site.sitio.nombre,
            locale: "es_AR",
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: ogWidth,
                    height: ogHeight,
                    alt: logoContent.textoAlternativo,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: site.sitio.tituloPagina,
            description: site.sitio.descripcion,
            images: [ogImage],
        },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { site } = await getRequestSiteContent();

    return (
        <html
            lang={site.sitio.idioma}
            className={`${inter.variable} ${plusJakarta.variable}`}
            suppressHydrationWarning
        >
            <body className="antialiased opr72-theme">
                <Script id="scroll-to-top" strategy="beforeInteractive">
                    {SCROLL_RESET_SCRIPT}
                </Script>
                <ScrollToTop />
                {children}
            </body>
        </html>
    );
}
