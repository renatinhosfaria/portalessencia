import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@essencia/ui/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Admin - Colégio Essência Feliz",
  description: "Painel Administrativo do Colégio Essência Feliz",
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
