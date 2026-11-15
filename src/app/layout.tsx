import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const mona = Mona_Sans({ subsets: ["latin"], variable: "--font-mona" });

export const metadata: Metadata = {
  title: "Virotica",
  description:
    "Version control and hosting for viral, bacterial, vaccine, DNA and RNA sequences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mona.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
