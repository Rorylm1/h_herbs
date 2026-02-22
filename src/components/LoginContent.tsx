"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";
import BotanicalBorder from "@/components/svg/BotanicalBorder";
import DandelionLogo from "@/components/svg/DandelionLogo";

export default function LoginContent() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") {
    return (
      <section className="relative bg-cream py-24 overflow-hidden">
        <div className="mx-auto max-w-md text-center">
          <div className="animate-pulse text-muted">Loading...</div>
        </div>
      </section>
    );
  }

  if (session?.user) {
    const userRole = (session.user as { role?: string }).role;
    return (
      <>
        <section className="relative bg-forest-800 py-16 md:py-20 overflow-hidden">
          <BotanicalPattern
            className="absolute inset-0 text-white opacity-[0.04]"
            patternId="login-hero-pattern"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
              Already Signed In
            </h1>
            <p className="mt-4 text-sage-200/70 max-w-2xl mx-auto text-lg leading-relaxed">
              You&apos;re currently signed in as {session.user.name || session.user.email}.
            </p>
          </div>
        </section>

        <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
          <DandelionWatermark
            position="right"
            size="lg"
            className="text-sage-300"
          />
          <div className="relative z-10 mx-auto max-w-md px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-4">
              <Link
                href={userRole === "practitioner" ? "/practitioner" : "/account"}
                className="block w-full bg-forest-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-forest-800 transition-colors cursor-pointer text-center"
              >
                Go to{" "}
                {userRole === "practitioner"
                  ? "Practitioner Dashboard"
                  : "My Account"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full bg-white text-forest-700 border border-forest-700 py-3 px-6 rounded-lg font-semibold hover:bg-sage-50 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const role = sessionData?.user?.role;

      window.location.href = role === "practitioner" ? "/practitioner" : "/account";
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-forest-800 py-16 md:py-20 overflow-hidden">
        <BotanicalPattern
          className="absolute inset-0 text-white opacity-[0.04]"
          patternId="login-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            Sign In
          </h1>
          <p className="mt-4 text-sage-200/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Access your account to manage bookings, view prescriptions, and
            more.
          </p>
        </div>
      </section>

      {/* Login form */}
      <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
        <DandelionWatermark
          position="right"
          size="lg"
          className="text-sage-300"
        />
        <div className="relative z-10 mx-auto max-w-md px-4 sm:px-6 lg:px-8">
          {/* Form card */}
          <div className="relative bg-white rounded-2xl shadow-card border border-sage-100 p-8 overflow-hidden">
            <BotanicalBorder
              position="top-right"
              className="absolute top-0 right-0 w-16 h-16 text-sage-200 opacity-30"
            />
            <BotanicalBorder
              position="bottom-left"
              className="absolute bottom-0 left-0 w-16 h-16 text-sage-200 opacity-30"
            />

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <DandelionLogo className="w-12 h-12 text-forest-700" />
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-charcoal mb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-charcoal mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-forest-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-forest-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-forest-700 hover:text-forest-800 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
