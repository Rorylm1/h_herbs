"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import BotanicalPattern from "@/components/svg/BotanicalPattern";
import DandelionWatermark from "@/components/DandelionWatermark";
import BotanicalBorder from "@/components/svg/BotanicalBorder";
import DandelionLogo from "@/components/svg/DandelionLogo";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"client" | "practitioner">("client");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validate(): string | null {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed. Please try again.");
        setIsLoading(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Account created but sign-in failed. Please log in manually.");
        router.push("/login");
        return;
      }

      router.push(role === "practitioner" ? "/practitioner" : "/account");
      router.refresh();
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
          patternId="signup-hero-pattern"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
            Create Your Account
          </h1>
          <p className="mt-4 text-sage-200/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Join Hector&apos;s Herbs to book consultations, manage prescriptions, and shop our herbal remedies.
          </p>
        </div>
      </section>

      {/* Signup form */}
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
              {/* Role selector */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("client")}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      role === "client"
                        ? "border-forest-700 bg-forest-700 text-white"
                        : "border-sage-200 text-charcoal hover:border-sage-300"
                    }`}
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("practitioner")}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      role === "practitioner"
                        ? "border-forest-700 bg-forest-700 text-white"
                        : "border-sage-200 text-charcoal hover:border-sage-300"
                    }`}
                  >
                    Practitioner
                  </button>
                </div>
              </div>

              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-charcoal mb-1"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-colors"
                  disabled={isLoading}
                />
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
                <p className="mt-1 text-xs text-muted">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Confirm password field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-charcoal mb-1"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-forest-700 hover:text-forest-800 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
