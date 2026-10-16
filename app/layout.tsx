import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diphro-me.vercel.app"),
  title: {
    default: "Mohamed A. Abdel Fattah — Software Enginner",
    template: "%s — Mohamed A. Abdel Fattah",
  },
  description:
    "Backend developer with three years of experience, active open-source contributor, and a student of cybersecurity and bioinformatics — building technology that serves people.",
  authors: [{ name: "Mohamed A. Abdel Fattah", url: "https://github.com/SssiiiSssii1" }],
  creator: "Mohamed A. Abdel Fattah",
  keywords: [
    "backend developer",
    "NestJS",
    "open source",
    "cybersecurity",
    "bioinformatics",
    "philosophy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mohamed A. Abdel Fattah",
    title: "Mohamed A. Abdel Fattah — Software Enginner",
    description:
      "Backend developer with three years of experience, active open-source contributor, and a student of cybersecurity and bioinformatics — building technology that serves people.",
  },
  twitter: {
    card: "summary",
    title: "Mohamed A. Abdel Fattah — Software Enginner",
    description:
      "Backend developer, open-source contributor, and a student of cybersecurity and bioinformatics.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoNaskhArabic.variable} h-full`}
    >
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        <div className="grid-fixed" aria-hidden="true" />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1 !important;transform:none !important}</style>",
          }}
        />
        <a
          href="#main"
          className="sr-only rounded border border-line-strong bg-elevated px-3 py-2 font-mono text-sm text-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
