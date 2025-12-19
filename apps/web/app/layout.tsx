import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@essencia/ui/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Portal Digital - Colégio Essência Feliz",
  description: "Portal Digital do Colégio Essência Feliz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
