import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import siteData from "@/data/opr72.json";
import { SCROLL_RESET_SCRIPT } from "@/lib/scroll-to-section";
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
    const { sitio, openGraph, logo } = siteData;
    const ogImage = openGraph?.imagen ?? "/og-image.jpg";
    const ogWidth = openGraph?.imagenAncho ?? 1200;
    const ogHeight = openGraph?.imagenAlto ?? 630;
    const shareDescription =
        openGraph?.descripcion ?? sitio.descripcion;

    return {
        metadataBase: new URL(getSiteUrl()),
        title: sitio.tituloPagina,
        description: sitio.descripcion,
        keywords: sitio.palabrasClave,
        icons: {
            icon: [
                { url: "/favicon.png", type: "image/png", sizes: "256x256" },
                { url: "/favicon.png", type: "image/png", sizes: "32x32" },
            ],
            apple: [
                { url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
            ],
        },
        openGraph: {
            title: sitio.tituloPagina,
            description: shareDescription,
            url: getSiteUrl(),
            siteName: sitio.nombre,
            locale: "es_AR",
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: ogWidth,
                    height: ogHeight,
                    alt: logo.textoAlternativo,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: sitio.tituloPagina,
            description: shareDescription,
            images: [ogImage],
        },
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { sitio } = siteData;

    return (
        <html
            lang={sitio.idioma}
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
