import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";
import Chatbot from "@/components/chat/Chatbot";

export const metadata: Metadata = {
  title: "Dataflowra | Future of Data Infrastructure",
  description: "Transform raw streams into organized intelligence. Dataflowra makes your data move, breathe, and deliver at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/Favicon.png" />
      </head>
      <body>
        <ClientProviders>
          {children}
          <Chatbot />
        </ClientProviders>
      </body>
    </html>
  );
}
