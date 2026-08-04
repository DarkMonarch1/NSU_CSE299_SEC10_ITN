"use client";

import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-[calc(100vh-80px)]">{children}</div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
