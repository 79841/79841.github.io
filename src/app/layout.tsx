import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/header";
import { Noto_Sans_KR, Roboto } from "next/font/google";
import { siteMetadata } from "@/data";
import { Footer } from "./_components/footer";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const noto_sans_kr = Noto_Sans_KR({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: siteMetadata.locale,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`flex w-screen flex-col items-center text-sm ${noto_sans_kr.className} ${roboto.className}`}
      >
        <Header />
        <div className="w-full max-w-[1320px] px-5">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
