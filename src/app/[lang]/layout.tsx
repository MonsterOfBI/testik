import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../globals.css";
import { hasLocale, locales } from "@/i18n/config";
import { getDict } from "@/i18n/dict";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SITE_URL } from "@/lib/site";

const display = Unbounded({ subsets: ["latin", "cyrillic"], variable: "--font-unbounded", weight: ["400", "500", "600", "700"] });
const sans = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-onest" });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const ru = lang === "ru";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: ru ? "testik — научные и весёлые тесты о себе" : "testik — scientific and fun tests about you",
      template: "%s · testik",
    },
    description: ru
      ? "Тесты на личность, темперамент, IQ, эмоции, отношения и карьеру по научным методикам, и забавные тесты вроде «Какое ты животное». Подробные результаты с графиками."
      : "Personality, temperament, IQ, emotion, relationship and career tests based on scientific instruments, plus fun quizzes. Detailed visual results.",
    alternates: { languages: { ru: "/ru", en: "/en" } },
    openGraph: { siteName: "testik", type: "website", locale: ru ? "ru_RU" : "en_US" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#16112a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f1ff" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDict(lang);
  return (
    <html lang={lang} data-theme="dark" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain flex min-h-dvh flex-col overflow-x-clip">
        <SmoothScroll />
        <MotionProvider>
          <Suspense fallback={<div className="h-[76px]" />}>
            <Header lang={lang} dict={dict} />
          </Suspense>
          <main className="flex-1 overflow-x-clip">{children}</main>
          <Footer lang={lang} dict={dict} />
          <CookieConsent dict={dict} />
        </MotionProvider>
      </body>
    </html>
  );
}
