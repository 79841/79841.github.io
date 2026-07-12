import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { profile, SITE_URL } from "@/shared/lib/profile";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "명인지 — Front-End Developer",
    template: "%s | 명인지",
  },
  description:
    "복잡한 문제를 단순한 구조로. 실시간 데이터 시각화와 렌더링 최적화를 다루는 프론트엔드 개발자 명인지의 포트폴리오.",
  keywords: [
    "Front-End Developer",
    "React",
    "Next.js",
    "성능 최적화",
    "AI 에이전트",
    "포트폴리오",
  ],
  openGraph: {
    title: "명인지 — Front-End Developer",
    description: "복잡한 문제를 단순한 구조로. 성능은 숫자로, 화면은 손끝으로.",
    url: SITE_URL,
    siteName: "명인지 포트폴리오",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "명인지 — Front-End Developer",
    description: "복잡한 문제를 단순한 구조로.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#131315" },
  ],
};

const themeInit = `try{const t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t;}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.nameEn,
  jobTitle: "Front-End Developer",
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  sameAs: [profile.github],
  address: { "@type": "PostalAddress", addressLocality: "Seoul", addressCountry: "KR" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
