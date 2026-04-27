import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dataflowra — Watch Your Data Wake Up",
  description:
    "Transform raw data streams into organized intelligence. Dataflowra is the intelligent data infrastructure platform that makes your data move, breathe, and deliver.",
  keywords: [
    "data infrastructure",
    "real-time analytics",
    "data pipeline",
    "ETL",
    "data streaming",
    "business intelligence",
  ],
  openGraph: {
    title: "Dataflowra — Watch Your Data Wake Up",
    description:
      "Transform raw data streams into organized intelligence with Dataflowra.",
    type: "website",
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
      data-theme="dark"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
