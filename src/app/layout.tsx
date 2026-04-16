import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: [
    { path: "../fonts/Manrope-ExtraLight.ttf", weight: "200" },
    { path: "../fonts/Manrope-Light.ttf", weight: "300" },
    { path: "../fonts/Manrope-Regular.ttf", weight: "400" },
    { path: "../fonts/Manrope-Medium.ttf", weight: "500" },
    { path: "../fonts/Manrope-SemiBold.ttf", weight: "600" },
    { path: "../fonts/Manrope-Bold.ttf", weight: "700" },
    { path: "../fonts/Manrope-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const artico = localFont({
  src: [
    { path: "../fonts/artico-medium.otf", weight: "500" },
    { path: "../fonts/artico-bold.otf", weight: "700" },
    { path: "../fonts/artico-extracond-black.otf", weight: "900" },
  ],
  variable: "--font-artico",
  display: "swap",
});

const bebas = localFont({
  src: [{ path: "../fonts/BebasNeue-Regular.ttf", weight: "400" }],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FootHost — Футбол для всех",
  description:
    "Зови друзей, выбирай время и выходи на матч. Бронирование полей и турниры.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${artico.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
