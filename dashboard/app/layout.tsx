import type { Metadata } from "next";
import "./globals.css";
import NextAuthSessionProvider from "./providers/sessionProvider";
import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QRestaurant",
  description: "Panel administracyjny systemu QRestaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.className}>
      <body className="text-white bg-slate-800">
        <NextAuthSessionProvider>
          <NavBar />
          <div>{children}</div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
