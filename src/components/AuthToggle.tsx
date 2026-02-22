"use client";

/*
  AUTH TOGGLE — floating dev button to simulate different auth states.

  ARCHITECTURE TIP: This is a prototype/demo tool, not part of the real UI.
  It sits in the bottom-left corner and lets you quickly switch between
  logged-out, client, and practitioner views without using the login form.

  Styled distinctly (purple/dev colors) to make it clear this isn't
  a real feature. Will be removed or hidden in production.
*/

import { useAuth, type AuthRole } from "@/context/AuthContext";

const ROLE_LABELS: Record<AuthRole, string> = {
  "logged-out": "Guest",
  client: "Client",
  practitioner: "Practitioner",
};

const ROLE_COLORS: Record<AuthRole, string> = {
  "logged-out": "bg-gray-600",
  client: "bg-emerald-600",
  practitioner: "bg-violet-600",
};

export default function AuthToggle() {
  const { role, cycleRole } = useAuth();

  return (
    <button
      onClick={cycleRole}
      className={`
        fixed bottom-4 left-4 z-50
        flex items-center gap-2
        px-3 py-2 rounded-full
        ${ROLE_COLORS[role]}
        text-white text-xs font-semibold
        shadow-lg
        hover:scale-105 active:scale-95
        transition-all duration-150
        border-2 border-dashed border-white/30
      `}
      title="Click to cycle auth state (Dev tool)"
    >
      {/* Dev indicator icon */}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>

      <span>{ROLE_LABELS[role]}</span>

      {/* Cycle indicator */}
      <svg className="w-3 h-3 opacity-60" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
