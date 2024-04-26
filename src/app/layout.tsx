import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles.css";
import "./icon-styles.css";
import Header from "@/components/header/Header";
import { Providers } from "./providers";
import BottomMenu from "@/components/menu/BottomMenu";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

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
      <body className={inter.className}>
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
