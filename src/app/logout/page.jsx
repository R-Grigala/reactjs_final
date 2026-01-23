"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("cart");

      window.dispatchEvent(new Event("authChange"));
    }

    router.replace("/login");
  }, [router]);

  return <div>Logging out...</div>;
}
