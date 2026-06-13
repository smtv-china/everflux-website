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
  metadataBase: new URL("https://evererpower.com"),
  title: {
    default: "Everflux 永流 | 半导体AI智慧能源供应平台",
    template: "%s | EVERFLUX",
  },
  description:
    "Everflux 永流打造半导体AI智慧能源供应平台，提供分布式能源、储能发电机、AI调度、碳管理和产业能源供应解决方案。",
  keywords: [
    "EVERFLUX",
    "Everflux 永流",
    "半导体AI智慧能源供应平台",
    "半导体能源供应",
    "AI智慧能源",
    "永流储能发电机",
    "储能发电机",
    "distributed energy",
    "AI energy",
    "renewable energy",
    "energy storage",
    "smart grid",
    "industrial energy platform",
  ],
  alternates: {
    canonical: "https://evererpower.com",
  },
  openGraph: {
    title: "Everflux 永流 | 半导体AI智慧能源供应平台",
    description:
      "Everflux builds a semiconductor AI smart energy supply platform for distributed energy, storage, AI dispatching, and industrial energy cooperation.",
    url: "https://evererpower.com",
    siteName: "EVERFLUX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/everflux-logo.jpg",
        width: 860,
        height: 773,
        alt: "Everflux 永流储能发电机 LOGO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everflux 永流 | 半导体AI智慧能源供应平台",
    description: "Semiconductor AI smart energy supply platform for distributed energy and storage.",
    images: ["/brand/everflux-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Everflux 永流储能发电机",
              url: "https://evererpower.com",
              logo: "https://evererpower.com/brand/everflux-logo.jpg",
              sameAs: ["https://www.linkedin.com/company/everflux-energy"],
              description:
                "Semiconductor AI smart energy supply platform integrating distributed energy, storage generator, AI dispatching, and carbon management.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "business development",
                email: "contact@evererpower.com",
                availableLanguage: ["en", "zh-CN"],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
