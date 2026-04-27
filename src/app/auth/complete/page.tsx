"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

function AuthCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      api.setToken(token);
      // The AuthProvider will pick up the token and fetch the user profile
      router.push("/dashboard");
    } else {
      router.push("/login?error=OAuth failed");
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)]">
      <Loader2 className="w-10 h-10 text-insight-teal animate-spin mb-4" />
      <h2 className="text-xl font-bold">Completing Authentication...</h2>
    </div>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)]">
        <Loader2 className="w-10 h-10 text-insight-teal animate-spin mb-4" />
      </div>
    }>
      <AuthCompleteContent />
    </Suspense>
  );
}
