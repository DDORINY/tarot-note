import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://tarot.ddoriny.com"),
  title: "Tarot Note",
  description: "다양한 타로 스프레드로 고민의 흐름을 기록하는 타로 리딩 서비스",
  openGraph: {
    title: "Tarot Note",
    description: "스토리처럼 읽히는 타로 리딩과 감정 기록 서비스",
    images: ["/images/brand/og-image.png"],
    siteName: "Tarot Note",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
