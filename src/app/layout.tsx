import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
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
    <html lang="es" className={`${sourceSans.variable} scroll-smooth`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
