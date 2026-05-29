import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Source_Sans_3 } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import { SCROLL_RESET_SCRIPT } from "@/lib/scroll-to-section";
import "./globals.css";

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

function getSiteUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3001";
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "PROSEPORT | OPR — Servicios Marítimos y Portuarios",
  description:
    "PROSEPORT es una Organización de Protección Reconocida (OPR) habilitada por la Prefectura Naval Argentina. Servicios de capacitación, protección, salvamento, buceo y asesoría legal en Buenos Aires.",
  keywords: [
    "OPR",
    "protección portuaria",
    "marítimo",
    "Prefectura Naval Argentina",
    "Buenos Aires",
    "PROSEPORT",
  ],
  icons: {
    icon: "/logo-proseport.jpeg",
    apple: "/logo-proseport.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={sourceSans.variable}>
      <body className="antialiased">
        <Script id="scroll-to-top" strategy="beforeInteractive">
          {SCROLL_RESET_SCRIPT}
        </Script>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
