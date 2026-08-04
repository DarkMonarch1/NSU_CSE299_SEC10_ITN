"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [user, pathname, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
