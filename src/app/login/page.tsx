import { Suspense } from "react";
import LoginContent from "@/components/LoginContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Hector's Herbs",
  description: "Sign in to your Hector's Herbs account to manage bookings, view prescriptions, and track orders.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <LoginContent />
    </Suspense>
  );
}
