import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import Modal from "@/components/modal/Modal";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SocketProvider } from "@/components/providers/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suihira",
  description: "Un réseau social pour tous",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="fr">
      <body className={`flex ${inter.className}`}>
        <AuthContext>
          <ToasterContext/>
          <Modal/>
          <SocketProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </SocketProvider>
        </AuthContext>
      </body>
    </html>
  );
}
