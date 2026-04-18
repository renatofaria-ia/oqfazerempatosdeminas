import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O que fazer em Patos de Minas | Agenda Oficial",
  description: "Descubra o melhor de Patos de Minas. Eventos culturais, agro, negócios, esportes e muito mais em um só lugar.",
  keywords: ["Patos de Minas", "eventos", "agenda cultural", "o que fazer", "Fenamilho", "ADESP"],
  authors: [{ name: "KONOK" }],
  openGraph: {
    title: "O que fazer em Patos de Minas | Agenda Oficial",
    description: "O ponto de referência único para todos os eventos de Patos de Minas.",
    url: "https://oqfazerempatosdeminas.com.br",
    siteName: "O que fazer em Patos de Minas",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-primary/30 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
