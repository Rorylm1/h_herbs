"use client";

/*
  AUTH CONTEXT — manages simulated authentication state across the app.

  ARCHITECTURE TIP: This is a "simulated" auth system for prototyping.
  Instead of real login/passwords, we use a simple toggle to switch
  between states: logged-out, client, or practitioner. This lets us
  build and demo all the account pages without real auth infrastructure.

  The auth state is persisted to localStorage so it survives page refreshes.
  In Milestone 8, this will be replaced with real authentication (Auth.js).
*/

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// The three possible auth states
export type AuthRole = "logged-out" | "client" | "practitioner";

// Mock user data shown when "logged in"
export type User = {
  name: string;
  email: string;
  savedPractitioner?: string; // Preferred practitioner slug
};

// Default mock users for each role
const MOCK_CLIENT: User = {
  name: "Sarah Mitchell",
  email: "sarah.mitchell@example.com",
  savedPractitioner: "hector",
};

const MOCK_PRACTITIONER: User = {
  name: "Hector",
  email: "hector@hectorsherbs.com",
};

type AuthContextType = {
  role: AuthRole;
  user: User | null;
  isLoggedIn: boolean;
  isClient: boolean;
  isPractitioner: boolean;
  login: (role: "client" | "practitioner") => void;
  logout: () => void;
  cycleRole: () => void; // For the dev toggle
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "hectors-herbs-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AuthRole>("logged-out");
  const [loaded, setLoaded] = useState(false);

  // Load auth state from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (["logged-out", "client", "practitioner"].includes(parsed.role)) {
          setRole(parsed.role);
        }
      } catch {
        // Invalid JSON — stay logged out
      }
    }
    setLoaded(true);
  }, []);

  // Persist to localStorage whenever role changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ role }));
    }
  }, [role, loaded]);

  // Get the mock user based on current role
  const user: User | null =
    role === "client"
      ? MOCK_CLIENT
      : role === "practitioner"
        ? MOCK_PRACTITIONER
        : null;

  // Convenience booleans
  const isLoggedIn = role !== "logged-out";
  const isClient = role === "client";
  const isPractitioner = role === "practitioner";

  // Login as a specific role
  const login = useCallback((newRole: "client" | "practitioner") => {
    setRole(newRole);
  }, []);

  // Logout — return to logged-out state
  const logout = useCallback(() => {
    setRole("logged-out");
  }, []);

  // Cycle through roles (for the dev toggle)
  const cycleRole = useCallback(() => {
    setRole((current) => {
      if (current === "logged-out") return "client";
      if (current === "client") return "practitioner";
      return "logged-out";
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        isLoggedIn,
        isClient,
        isPractitioner,
        login,
        logout,
        cycleRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
  useAuth() — custom hook to access auth state from any component.
  Throws an error if used outside the AuthProvider (helps catch bugs).
*/
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
