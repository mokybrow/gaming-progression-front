import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";
import "./icon-styles.css";
import Header from "@/components/header/Header";
import { Providers } from "./providers";
import BottomMenu from "@/components/menu/BottomMenu";
import localFont from 'next/font/local'

const montserrat = localFont({
  src: [
    {
      path: '../fonts/Montserrat-VariableFont_wght.ttf',
      style: "normal"
    },
    {
      path: '../fonts/Montserrat-Italic-VariableFont_wght.ttf',
      style: "italic"
    },
  ],
  variable: "--font-motserrat"

})

export const metadata: Metadata = {
  title: "MBRW - играй, делись, общайся",
  description: "Проект создан в учебных целях",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <div id="app">
          <Providers>
            <Header />
            {children}
            <BottomMenu />
          </Providers>
        </div>
      </body>
    </html>
  );
}
