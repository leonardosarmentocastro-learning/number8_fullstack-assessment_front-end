import type { Metadata } from "next";
import { /* Reddit_Mono, */ Josefin_Sans } from "next/font/google";
import "./globals.css";
import "./icons.css";

// const redditMono = Reddit_Mono({ subsets: ['latin'] });
const josefinSans = Josefin_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Front-end assessment",
  description: "by Leonardo Sarmento de Castro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={josefinSans.className}>
        <main className="p-8 h-screen bg-[#1D2025] overflow-y-scroll">
          {children}
        </main>
      </body>
    </html>
  );
}
