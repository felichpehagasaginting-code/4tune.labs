import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/smooth-scroll.client";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F7F5EF",
};

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://4tunelabs.vercel.app"),
  title: "4tune.labs — Studio Rekayasa Software & Servis Hardware HP, Laptop maupun PC",
  description:
    "4tune.labs adalah studio rekayasa teknologi yang dijalankan langsung oleh empat engineer mahasiswa. Menggabungkan pembuatan website modern & aplikasi AI dengan reparasi smartphone (HP), servis laptop/PC lemot, upgrade SSD & RAM, dan perawatan perangkat bergaransi.",
  keywords: [
    "4tune.labs",
    "servis laptop",
    "servis hp",
    "reparasi smartphone",
    "upgrade SSD RAM",
    "jasa website mahasiswa",
    "landing page UMKM",
    "service komputer",
    "perbaikan gadget HP tablet",
    "servis HP cibitung setu bekasi",
    "Next.js web development",
  ],
  openGraph: {
    title: "4tune.labs — Studio Rekayasa Software & Servis Hardware HP, Laptop maupun PC",
    description:
      "Dari kode web modern hingga sirkuit hardware, kami bereskan tuntas. Transparan, bergaransi, dan ramah kantong mahasiswa & UMKM.",
    url: "https://4tunelabs.vercel.app",
    siteName: "4tune.labs",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://4tunelabs.vercel.app/og-image.png",
        secureUrl: "https://4tunelabs.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "4tune.labs — Studio Rekayasa Software & Servis Hardware HP, Laptop maupun PC",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4tune.labs — Studio Rekayasa Software & Servis Hardware HP, Laptop maupun PC",
    description:
      "Dari kode web modern hingga sirkuit hardware, kami bereskan tuntas. Transparan, bergaransi, dan ramah kantong mahasiswa & UMKM.",
    images: ["https://4tunelabs.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="image_src" href="https://4tunelabs.vercel.app/og-image.png" />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
