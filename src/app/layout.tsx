import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Source_Sans_3 } from "next/font/google";
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

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const fraunces = Fraunces({
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
  return "http://localhost:3001";
}

export async function generateMetadata(): Promise<Metadata> {
  const { site, logoContent } = await getRequestSiteContent();

  return {
    metadataBase: new URL(getSiteUrl()),
    title: site.sitio.tituloPagina,
    description: site.sitio.descripcion,
    keywords: site.sitio.palabrasClave,
    icons: logoContent.ruta
      ? { icon: logoContent.ruta, apple: logoContent.ruta }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { site, siteId } = await getRequestSiteContent();
  const bodyTheme = siteId === "opr72" ? "opr72-theme" : "theme-proseport";

  return (
    <html
      lang={site.sitio.idioma}
      className={`${sourceSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className={`antialiased ${bodyTheme}`}>
        <Script id="scroll-to-top" strategy="beforeInteractive">
          {SCROLL_RESET_SCRIPT}
        </Script>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
