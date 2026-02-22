"use client";

/*
  LOGIN CONTENT — simulated login form with role selector.

  ARCHITECTURE TIP: This is a "mock" login — it doesn't actually
  verify credentials. Instead, clicking "Sign In" just updates
  the AuthContext to simulate being logged in. The role buttons
  let you choose between client and practitioner views.

  In Milestone 8, this will be replaced with real Auth.js
  authentication (email/password, Google OAuth, etc.).
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type AuthRole } from "@/context/AuthContext";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";
import BotanicalBorder from "@/components/svg/BotanicalBorder";
import { DandelionLogo } from "@/components/svg/DandelionLogo";

export default function LoginContent() {
  const router = useRouter();
  const { login, logout, isLoggedIn, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"client" | "practitioner">("client");

  // If already logged in, show a different view
  if (isLoggedIn) {
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
              You&apos;re currently signed in as a {role}.
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
              <button
                onClick={() => router.push(role === "practitioner" ? "/practitioner" : "/account")}
                className="w-full bg-forest-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
              >
                Go to {role === "practitioner" ? "Practitioner Dashboard" : "My Account"}
              </button>
              <button
                onClick={() => logout()}
                className="w-full bg-white text-forest-700 border border-forest-700 py-3 px-6 rounded-lg font-semibold hover:bg-sage-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock login — just update auth state and redirect
    login(selectedRole);
    router.push(selectedRole === "practitioner" ? "/practitioner" : "/account");
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
            Access your account to manage bookings, view prescriptions, and more.
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

            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              {/* Role selector */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("client")}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      selectedRole === "client"
                        ? "border-forest-700 bg-forest-700 text-white"
                        : "border-sage-200 text-charcoal hover:border-sage-300"
                    }`}
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("practitioner")}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      selectedRole === "practitioner"
                        ? "border-forest-700 bg-forest-700 text-white"
                        : "border-sage-200 text-charcoal hover:border-sage-300"
                    }`}
                  >
                    Practitioner
                  </button>
                </div>
              </div>

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
                />
              </div>

              {/* Forgot password link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-forest-700 hover:text-forest-800 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-forest-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-forest-800 transition-colors"
              >
                Sign In as {selectedRole === "client" ? "Client" : "Practitioner"}
              </button>

              {/* Prototype note */}
              <p className="text-center text-xs text-muted mt-4">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Prototype mode — no real authentication required
                </span>
              </p>
            </form>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted mt-6">
            Don&apos;t have an account?{" "}
            <button className="text-forest-700 hover:text-forest-800 font-medium hover:underline">
              Create one
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
