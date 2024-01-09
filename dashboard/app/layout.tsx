import type { Metadata } from "next";
import "./globals.css";
import NextAuthSessionProvider from "./providers/sessionProvider";
import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QRestaurant",
  description: "Panel administracyjny systemu QRestaurant",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pl" className={inter.className}>
      <body className="text-white bg-slate-800">
        <NextAuthSessionProvider session={session}>
          <NavBar />
          <div>{children}</div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
