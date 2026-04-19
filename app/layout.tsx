import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bizneslar uchun yechimlar",
  description:
    "Biz tayyorlagan amaliy loyihalar: admin panel, online do'kon, mobil ilova va CRM tizimlari. Sizning biznesingizga mos tizimni ham tayyorlab beramiz.",
  applicationName: "Bizneslar uchun yechimlar",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    siteName: "Bizneslar uchun yechimlar",
    title: "Bizneslar uchun yechimlar",
    description:
      "Biz yaratgan xizmat va savdo tizimlari namunalari. Siz uchun ham talabga mos tizim ishlab chiqamiz.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bizneslar uchun yechimlar",
    description:
      "Admin panel, online do'kon, mobil ilova va boshqa tizimlar bo'yicha amaliy loyihalar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <div className="fixed right-4 top-4 z-50">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
