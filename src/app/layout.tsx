import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const metadata: Metadata = {
  title: "Dataflowra | Future of Data Infrastructure",
  description: "Transform raw streams into organized intelligence. Dataflowra makes your data move, breathe, and deliver at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Favicon.png" />
      </head>
      <body>
        <GoogleReCaptchaProvider
          reCaptchaKey={recaptchaKey}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}
