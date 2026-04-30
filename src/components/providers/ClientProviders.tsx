"use client";

import { Suspense } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "./ScrollToTop";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  if (!recaptchaKey && process.env.NODE_ENV === "development") {
    console.warn("reCAPTCHA site key is missing. Forms may not submit correctly. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your .env file.");
  }

  return (
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
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        {children}
      </AuthProvider>
    </GoogleReCaptchaProvider>
  );
}
