import type { Metadata } from "next";
import "./globals.css";
import NextAuthSessionProvider from "./providers/sessionProvider";
import NavBar from "@/components/NavBar";

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
    <html lang="pl">
      <body className="text-white bg-gray-800">
        <NextAuthSessionProvider>
          <NavBar />
          <div>{children}</div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
