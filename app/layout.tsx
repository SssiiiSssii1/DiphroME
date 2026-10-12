import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Software Developer",
    template: "%s",
  },
  description:
    "Software developer working across backend systems and the philosophy of how we come to know what we know.",
  openGraph: {
    type: "website",
    title: "Software Developer",
    description:
      "Software developer working across backend systems and the philosophy of how we come to know what we know.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
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
